package com.example.demo.controllers;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.example.demo.controllers.RecipeAiController.RecipeGenerationException;
import com.example.demo.dto.RecipeGenerationRequest;
import com.example.demo.services.OpenAiService;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.http.HttpServletRequest; // For Bucket4j IP identification
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*") // Configure more restrictively for production
@RequiredArgsConstructor
@Slf4j
public class RecipeAiController {

    private final OpenAiService openAiService;
    private final PromptBuilder promptBuilder; // Make sure this bean is available

    // Rate limiting map for requests TO THIS SERVER (not to OpenAI)
    private final Map<String, Bucket> ipBucketMap = new ConcurrentHashMap<>();

    // Bucket4j configuration: 5 requests per minute from a single IP to this controller endpoint
    private Bucket createBucketPerIp() {
        Bandwidth limit = Bandwidth.classic(5, Refill.intervally(5, Duration.ofMinutes(1)));
        return Bucket.builder().addLimit(limit).build();
    }

    private Bucket resolveBucketForIp(String ip) {
        return ipBucketMap.computeIfAbsent(ip, k -> createBucketPerIp());
    }

    @PostMapping("/generate")
    public Mono<Map<String, Map<String, String>>> generateRecipe(@RequestBody RecipeGenerationRequest request,
                                                                 HttpServletRequest httpRequest) { // HttpServletRequest for IP
        String clientIp = httpRequest.getRemoteAddr();
        Bucket bucket = resolveBucketForIp(clientIp);

        if (!bucket.tryConsume(1)) {
            log.warn("Rate limit exceeded for IP: {}", clientIp);
            // Return an error Mono directly, which will be handled by the @ExceptionHandler
            return Mono.error(new TooManyRequestsToSelfException("Too many requests to this server – please wait a minute."));
        }

        if (request.getIngredients() == null || request.getIngredients().isEmpty()) {
            log.warn("Bad request: Ingredients list is empty.");
            return Mono.error(new IllegalArgumentException("Ingredients list cannot be empty."));
        }

        String prompt = promptBuilder.buildPrompt(
                request.getDifficulty(),
                request.getTimeRange(),
                request.getIngredients(),
                request.getLanguage()
        );

        log.info("Received request to generate recipe for IP: {}", clientIp);
        return openAiService.generateRecipe(prompt)
                .map(recipe -> Map.of("recipe", recipe))
                .onErrorResume(WebClientResponseException.TooManyRequests.class, e -> {
                    // This catches the 429 from OpenAiService specifically
                    log.error("OpenAI rate limit hit when calling from controller.", e);
                    return Mono.error(new OpenAiRateLimitException("The recipe service is currently busy (OpenAI rate limit). Please try again in a moment."));
                })
                .onErrorResume(throwable -> {
                    // Catch other errors from OpenAiService
                    log.error("An unexpected error occurred while generating the recipe.", throwable);
                    return Mono.error(new RecipeGenerationException("Failed to generate recipe due to an internal error."));
                });
    }

    // Custom Exception for rate limiting calls to this server itself
    public static class TooManyRequestsToSelfException extends RuntimeException {
        public TooManyRequestsToSelfException(String message) {
            super(message);
        }
    }

    // Custom Exception for OpenAI specific rate limit errors passed to client
    public static class OpenAiRateLimitException extends RuntimeException {
        public OpenAiRateLimitException(String message) {
            super(message);
        }
    }

    // Custom Exception for other recipe generation errors
    public static class RecipeGenerationException extends RuntimeException {
        public RecipeGenerationException(String message) {
            super(message);
        }
    }


    // Exception Handlers
    @ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
    @ExceptionHandler(TooManyRequestsToSelfException.class)
    public Map<String, String> handleTooManyRequestsToSelf(TooManyRequestsToSelfException e) {
        return Map.of("error", e.getMessage(), "type", "SERVER_RATE_LIMIT");
    }

    @ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
    @ExceptionHandler(OpenAiRateLimitException.class)
    public Map<String, String> handleOpenAiRateLimit(OpenAiRateLimitException e) {
        return Map.of("error", e.getMessage(), "type", "OPENAI_RATE_LIMIT");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public Map<String, String> handleIllegalArgument(IllegalArgumentException e) {
        return Map.of("error", e.getMessage(), "type", "BAD_REQUEST");
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(RecipeGenerationException.class)
    public Map<String, String> handleRecipeGenerationError(RecipeGenerationException e) {
        return Map.of("error", e.getMessage(), "type", "INTERNAL_ERROR");
    }

    // A more general fallback handler for other unexpected errors
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public Map<String, String> handleGenericException(Exception e) {
        log.error("An unexpected generic error occurred: ", e); // Log the full stack trace for unexpected errors
        return Map.of("error", "An unexpected error occurred. Please try again later.", "type", "UNEXPECTED_ERROR");
    }
}