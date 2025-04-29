package com.example.demo.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RecipeAiController {

    private final WebClient webClient;

    @Value("${openai.api.key}")
    private String openaiApiKey;

    public RecipeAiController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
    }

    @PostMapping("/generate-recipe")
    public Mono<Map<String, String>> generateRecipe(@RequestBody Map<String, String> payload) {
        String ingredients = payload.get("ingredients");

        String prompt = """
                You are a recipe expert. Given the following ingredients: %s,
                write a recipe including:
                - Title
                - Ingredients with measurements
                - Step-by-step instructions
                - Cooking time and serving size
                """.formatted(ingredients);

        return webClient.post()
                .uri("/chat/completions")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + openaiApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of(
                        "model", "gpt-4",
                        "messages", List.of(Map.of("role", "user", "content", prompt)),
                        "temperature", 0.7
                ))
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(response -> {
                    String content = response
                            .path("choices")
                            .get(0)
                            .path("message")
                            .path("content")
                            .asText();
                    return Map.of("recipe", content);
                });
    }
}

