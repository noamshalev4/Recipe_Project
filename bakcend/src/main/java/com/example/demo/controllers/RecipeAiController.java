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

import com.example.demo.dto.RecipeGenerationRequest;
import com.example.demo.services.OpenAiService;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
public class RecipeAiController {

    private final OpenAiService openAiService;
    private final PromptBuilder promptBuilder;
    private final Map<String, Bucket> ipBucketMap = new ConcurrentHashMap<>();

    private Bucket createBucketPerIp() {
//        Bandwidth limit = Bandwidth.classic(5, Refill.intervally(5, Duration.ofMinutes(1)));
//        return Bucket.builder().addLimit(limit).build();

        Bandwidth limit = Bandwidth.classic(1, Refill.intervally(1, Duration.ofDays(1)));
        return Bucket.builder().addLimit(limit).build();
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null && !xfHeader.isEmpty()) {
            return xfHeader.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private Bucket resolveBucketForIp(String ip) {
        return ipBucketMap.computeIfAbsent(ip, k -> createBucketPerIp());
    }

    @PostMapping("/generate")
    public Mono<Map<String, Map<String, String>>> generateRecipe(@RequestBody RecipeGenerationRequest request,
                                                                 HttpServletRequest httpRequest) {
//       Make current thread sleep for 3 minutes to simulate a long-running process
//        try {
//            Thread.sleep(180_000); // Simulate a delay for testing purposes
//        } catch (InterruptedException e) {
//            Thread.currentThread().interrupt();
//            log.error("Thread interrupted during sleep", e);
//        }
        String clientIp = getClientIp(httpRequest);
        Bucket bucket = resolveBucketForIp(clientIp);

        if (!bucket.tryConsume(1)) {
            log.warn("Rate limit exceeded for IP: {}", clientIp);
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
        return openAiService.generateRecipeAndImage(prompt)
                .map(recipe -> Map.of("recipe", recipe))
                .onErrorResume(WebClientResponseException.TooManyRequests.class, e -> {
                    log.error("OpenAI rate limit hit.", e);
                    return Mono.error(new OpenAiRateLimitException("The recipe service is currently busy (OpenAI rate limit)."));
                })
                .onErrorResume(throwable -> {
                    log.error("An unexpected error occurred.", throwable);
                    return Mono.error(new RecipeGenerationException("Failed to generate recipe."));
                });
    }

    public static class TooManyRequestsToSelfException extends RuntimeException {
        public TooManyRequestsToSelfException(String message) {
            super(message);
        }
    }

    public static class OpenAiRateLimitException extends RuntimeException {
        public OpenAiRateLimitException(String message) {
            super(message);
        }
    }

    public static class RecipeGenerationException extends RuntimeException {
        public RecipeGenerationException(String message) {
            super(message);
        }
    }

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

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public Map<String, String> handleGenericException(Exception e) {
        log.error("An unexpected generic error occurred: ", e);
        return Map.of("error", "An unexpected error occurred. Please try again later.", "type", "UNEXPECTED_ERROR");
    }


    @PostMapping("/generate-no-limit")
    public Mono<Map<String, Map<String, String>>> generateRecipeNoLimit(
            @RequestBody RecipeGenerationRequest request
    ) {
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

        log.info("Received request to generate recipe (no limit).");
        return openAiService.generateRecipeAndImage(prompt)
                .map(recipe -> Map.of("recipe", recipe))
                .onErrorResume(WebClientResponseException.TooManyRequests.class, e -> {
                    log.error("OpenAI rate limit hit.", e);
                    return Mono.error(new OpenAiRateLimitException("The recipe service is currently busy (OpenAI rate limit)."));
                })
                .onErrorResume(throwable -> {
                    log.error("An unexpected error occurred.", throwable);
                    return Mono.error(new RecipeGenerationException("Failed to generate recipe."));
                });

    }

}