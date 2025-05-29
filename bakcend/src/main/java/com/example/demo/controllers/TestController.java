package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.example.demo.services.OpenAiService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {

    private final OpenAiService openAiService;
    private final PromptBuilder promptBuilder;

    @GetMapping("/openai-recipe")
    public Mono<Map<String, Object>> testOpenAiRecipeGeneration() {
        log.info("Received request for /api/test/openai-recipe");

        // 1. Define dummy data for the prompt
        String difficulty = "Easy";
        String timeRange = "20-40 minutes";
        Map<String, Object> ingredients = new HashMap<>();
        ingredients.put("Protein", List.of("Salmon Fillet"));
        ingredients.put("Vegetables", List.of("Asparagus", "Lemon"));
        ingredients.put("Fats", List.of("Olive Oil"));
        ingredients.put("Spices and Herbs", List.of("Dill", "Salt", "Black Pepper"));
        String language = "en";

        // 2. Build the prompt
        String prompt;
        try {
            prompt = promptBuilder.buildPrompt(difficulty, timeRange, ingredients, language);
            log.info("Generated test prompt: {}", prompt);
        } catch (Exception e) {
            log.error("Error building prompt in TestController", e);
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("error", "Error building test prompt: " + e.getMessage());
            return Mono.just(errorMap);
        }

        final String finalPrompt = prompt; // Need this for lambda expressions

        // 3. Call the OpenAiService
        return openAiService.generateRecipe(finalPrompt)
                .map(recipeData -> {
                    log.info("Successfully received recipe and image from OpenAI for test prompt.");

                    // Extract recipe text and image URL
                    String recipeText = recipeData.get("recipe");
                    String imageUrl = recipeData.get("image");

                    // Check if image was successfully generated
                    boolean hasValidImage = imageUrl != null && !imageUrl.startsWith("Error");

                    Map<String, Object> resultMap = new HashMap<>();
                    resultMap.put("testRecipePrompt", finalPrompt);
                    resultMap.put("recipeText", recipeText);
                    resultMap.put("imageUrl", imageUrl != null ? imageUrl : "No image generated");
                    resultMap.put("imageGenerated", hasValidImage);
                    return resultMap;
                })
                .onErrorResume(WebClientResponseException.TooManyRequests.class, e -> {
                    String responseBody = e.getResponseBodyAsString();
                    log.error("OpenAI Rate Limit (429) during test: {}. Response Body: {}", e.getMessage(), responseBody);

                    Map<String, Object> errorMap = new HashMap<>();
                    errorMap.put("error", "OpenAI Rate Limit (429) during test.");
                    errorMap.put("details", e.getMessage());
                    errorMap.put("responseBody", responseBody);
                    errorMap.put("testRecipePrompt", finalPrompt);
                    return Mono.just(errorMap);
                })
                .onErrorResume(e -> {
                    log.error("Error during OpenAI test: {}", e.getMessage(), e);

                    Map<String, Object> errorMap = new HashMap<>();
                    errorMap.put("error", "An unexpected error occurred during OpenAI test: " + e.getMessage());
                    errorMap.put("testRecipePrompt", finalPrompt);
                    return Mono.just(errorMap);
                });
    }
}