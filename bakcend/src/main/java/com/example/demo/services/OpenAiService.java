package com.example.demo.services;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class OpenAiService {

    private final WebClient webClient;
    private final String model;

    public OpenAiService(@Value("${openai.api.key}") String apiKey,
                         @Value("${openai.model:gpt-4o}") String model) {
        this.webClient = WebClient.builder()
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
        this.model = model;
    }

    // Generate only the recipe text
    public Mono<Map<String, String>> generateRecipeAndImage(String userPrompt) {
        return generateTextRecipe(userPrompt)
                .map(recipe -> {
                    // Image generation removed
                    return Map.of("recipe", recipe);
                });

//        return generateTextRecipe(userPrompt)
//                .flatMap(recipe -> {
//                    String prompt = isHebrew(userPrompt)
//                            ? "תבשיל על בסיס המתכון הבא (מוצרים בעולם האמיתי לא מצוירים): " + recipe
//                            : "A dish based on the following recipe (real world items not cartoon): " + recipe;
//                    return generateImage(prompt)
//                            .map(imageUrl -> Map.of("recipe", recipe, "image", imageUrl));
//                });
    }

    private Mono<String> generateTextRecipe(String prompt) {
        log.info("Generating text recipe with prompt: {}", prompt);

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", new Object[]{
                        Map.of("role", "system", "content", "You are a helpful chef assistant."),
                        Map.of("role", "user", "content", prompt)
                },
                "temperature", 0.7,
                "max_tokens", 1000
        );

        return webClient.post()
                .uri("https://api.openai.com/v1/chat/completions")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .flatMap(response -> {
                    try {
                        @SuppressWarnings("unchecked")
                        var choices = (List<Map<String, Object>>) response.get("choices");
                        if (choices == null || choices.isEmpty()) {
                            return Mono.error(new RuntimeException("No choices found."));
                        }
                        @SuppressWarnings("unchecked")
                        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                        return Mono.just(message.get("content").toString());
                    } catch (Exception e) {
                        return Mono.error(new RuntimeException("Error parsing recipe response."));
                    }
                })
                .onErrorResume(WebClientResponseException.class,
                        e -> Mono.error(new RuntimeException("Error generating recipe: " + e.getResponseBodyAsString())))
                .onErrorResume(Exception.class,
                        e -> Mono.error(new RuntimeException("Unexpected error: " + e.getMessage())));
    }

    private boolean isHebrew(String text) {
        if (text == null) return false;
        return Pattern.compile("\\p{InHebrew}").matcher(text).find();
    }

//    public Mono<String> generateImage(String prompt) {
//        log.info("Generating image with prompt length {}", prompt.length());
//        if (prompt.length() > 1000) {
//            log.warn("Prompt exceeds 1000 characters. Truncating.");
//            prompt = prompt.substring(0, 1000);
//        }
//        Map<String, Object> requestBody = Map.of(
//                "model", "gpt-image-1",
//                "prompt", prompt,
//                "size", "1024x1024",
//                "quality", "high",
//                "background", "transparent",
//                "n", 1
//        );
//
//        return webClient.post()
//                .uri("https://api.openai.com/v1/images/generations")
//                .bodyValue(requestBody)
//                .retrieve()
//                .bodyToMono(Map.class)
//                .timeout(Duration.ofSeconds(120))
//                .flatMap(response -> {
//                    try {
//                        @SuppressWarnings("unchecked")
//                        var data = (List<Map<String, Object>>) response.get("data");
//                        if (data == null || data.isEmpty()) {
//                            return Mono.error(new RuntimeException("No image found."));
//                        }
//                        return Mono.just(data.get(0).get("b64_json").toString());
//                    } catch (Exception e) {
//                        return Mono.error(new RuntimeException("Error parsing image response."));
//                    }
//                })
//                .onErrorResume(WebClientResponseException.class, e -> {
//                    log.error("Image generation error: status={}, body={}", e.getStatusCode(), e.getResponseBodyAsString());
//                    return Mono.error(new RuntimeException("Error generating image: " + e.getResponseBodyAsString()));
//                })
//                .onErrorResume(Exception.class,
//                        e -> Mono.error(new RuntimeException("Unexpected error: " + e.getMessage())));
//    }
}