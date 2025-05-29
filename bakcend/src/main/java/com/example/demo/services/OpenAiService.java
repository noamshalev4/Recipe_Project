package com.example.demo.services;

import java.util.Map;

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

    public Mono<Map<String, String>> generateRecipe(String prompt) {
        System.err.println("Generating Recipe started");

        log.info("Generating recipe using OpenAI API with prompt: {}", prompt);

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", new Object[]{
                        Map.of("role", "system", "content", "You are a helpful chef assistant."),
                        Map.of("role", "user", "content", prompt)
                },
                "temperature", 0.7,
                "max_tokens", 1000
        );
        System.err.println("Generating Recipe ended");
        return webClient.post()
                .uri("https://api.openai.com/v1/chat/completions")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .flatMap(response -> {
                    try {
                        @SuppressWarnings("unchecked")
                        var choices = (java.util.List<Map<String, Object>>) response.get("choices");
                        if (choices == null || choices.isEmpty()) {
                            log.error("No choices found in OpenAI response: {}", response);
                            return Mono.error(new RuntimeException("Error: No choices found."));
                        }
                        @SuppressWarnings("unchecked")
                        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                        String recipe = message.get("content").toString();

//                        return  Mono.just(Map.of("recipe", recipe));
//                         Generate an image for the recipe
                        return generateImage("A dish based on the following recipe: " + recipe)
                                .map(imageUrl -> Map.of("recipe", recipe, "image", imageUrl));
                    } catch (Exception e) {
                        log.error("Error parsing OpenAI response: {}", response, e);
                        return Mono.error(new RuntimeException("Error parsing response."));
                    }
                });
    }
    public Mono<String> generateImage(String prompt) {
        System.err.println("Generating Image started");
        log.info("Generating image using DALL-E API with prompt: {}", prompt);

        Map<String, Object> requestBody = Map.of(
                "model", "dall-e-3",
                "prompt", prompt,
                "n", 1,
                "size", "1024x1024",
                "quality", "standard"
        );
        System.err.println("Generating Image ended");
        return webClient.post()
                .uri("https://api.openai.com/v1/images/generations")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .doOnNext(response -> log.debug("DALL-E API response: {}", response))
                .map(response -> {
                    try {
                        @SuppressWarnings("unchecked")
                        var data = (java.util.List<Map<String, Object>>) response.get("data");
                        if (data == null || data.isEmpty()) {
                            log.error("No image data found in DALL-E response: {}", response);
                            return "Error: No image URL found.";
                        }
                        String imageUrl = data.get(0).get("url").toString();
                        log.info("Successfully generated image URL: {}", imageUrl);
                        return imageUrl;
                    } catch (Exception e) {
                        log.error("Error parsing DALL-E response: {}", response, e);
                        return "Error parsing response.";
                    }
                })
                .onErrorResume(WebClientResponseException.class, e -> {
                    log.error("DALL-E API error: {}, Response body: {}",
                            e.getMessage(), e.getResponseBodyAsString());
                    return Mono.just("Error generating image: " + e.getMessage());
                });
    }
}