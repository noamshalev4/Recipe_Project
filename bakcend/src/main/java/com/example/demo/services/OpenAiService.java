package com.example.demo.services;

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

    // Generate recipe text and image using Pollinations.ai
    public Mono<Map<String, String>> generateRecipeAndImage(String userPrompt) {
        return generateTextRecipe(userPrompt)
                .flatMap(recipe -> {
                    // Create a more specific image prompt based on the recipe
                    String imagePrompt = createImagePromptFromRecipe(recipe, userPrompt);
                    return generateImageWithPollinations(imagePrompt)
                            .map(imageUrl -> Map.of("recipe", recipe, "image", imageUrl));
                });
    }

    private Mono<String> generateTextRecipe(String prompt) {
        // log.info("Generating text recipe with prompt: {}", prompt);

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "messages", new Object[] {
                        Map.of("role", "system", "content", "You are a helpful chef assistant."),
                        Map.of("role", "user", "content", prompt)
                },
                "temperature", 0.7,
                "max_tokens", 1000);

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
                        e -> Mono
                                .error(new RuntimeException("Error generating recipe: " + e.getResponseBodyAsString())))
                .onErrorResume(Exception.class,
                        e -> Mono.error(new RuntimeException("Unexpected error: " + e.getMessage())));
    }

    private boolean isHebrew(String text) {
        if (text == null)
            return false;
        return Pattern.compile("\\p{InHebrew}").matcher(text).find();
    }

    /**
     * Create a specific image prompt based on the recipe content and user prompt
     */
    private String createImagePromptFromRecipe(String recipe, String userPrompt) {
        // Extract key ingredients or dish type from the user prompt and recipe
        String basePrompt = "professional_food_photography_realistic_appetizing_delicious_dish";

        // Try to extract dish type or main ingredients from the user prompt
        String dishInfo = extractDishInfo(userPrompt.toLowerCase());
        if (dishInfo != null && !dishInfo.isEmpty()) {
            basePrompt = dishInfo + "_" + basePrompt;
        }

        return basePrompt + "_high_quality_food_styling";
    }

    /**
     * Extract dish type or main ingredients from user prompt
     */
    private String extractDishInfo(String prompt) {
        prompt = prompt.toLowerCase();

        // Common food types that work well with image generation
        String[] foodKeywords = {
                "pasta", "pizza", "burger", "salad", "soup", "steak", "chicken", "fish",
                "rice", "noodles", "sandwich", "cake", "bread", "curry", "stir_fry",
                "tacos", "sushi", "ramen", "pancakes", "eggs", "breakfast", "dessert"
        };

        for (String keyword : foodKeywords) {
            if (prompt.contains(keyword)) {
                return keyword.replace(" ", "_");
            }
        }

        // If no specific food type found, return generic
        return "gourmet_food";
    }

    /**
     * Generate image using Pollinations.ai free API
     * The API simply requires a GET request to https://pollinations.ai/p/{prompt}
     */
    public Mono<String> generateImageWithPollinations(String prompt) {
        log.info("Generating image with Pollinations.ai, prompt: {}", prompt);

        // Clean and format the prompt for URL
        String cleanPrompt = prompt.replaceAll("[^a-zA-Z0-9\\s_]", "")
                .replaceAll("\\s+", "_")
                .toLowerCase();

        // Limit prompt length to reasonable size for URL
        if (cleanPrompt.length() > 200) {
            cleanPrompt = cleanPrompt.substring(0, 200);
        }

        String imageUrl = "https://pollinations.ai/p/" + cleanPrompt;

        // Return the direct URL - Pollinations.ai generates the image on-demand
        return Mono.just(imageUrl)
                .doOnSuccess(url -> log.info("Generated image URL: {}", url))
                .onErrorResume(Exception.class, e -> {
                    log.error("Error generating image with Pollinations.ai: {}", e.getMessage());
                    return Mono.just("https://pollinations.ai/p/delicious_food_dish"); // fallback
                });
    }
}