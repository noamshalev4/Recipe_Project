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
        log.info("Creating image prompt from user prompt: {}", userPrompt);

        // Extract actual ingredients from the user prompt
        String ingredientsPrompt = extractIngredientsFromPrompt(userPrompt.toLowerCase());

        // Add timestamp-based uniqueness to ensure different images
        long timestamp = System.currentTimeMillis();
        String uniqueId = String.valueOf(timestamp % 10000); // Last 4 digits for uniqueness

        // Create final prompt with ingredients and uniqueness
        String finalPrompt = ingredientsPrompt + "_delicious_dish_professional_food_photography_" + uniqueId;

        log.info("Generated image prompt: {}", finalPrompt);
        return finalPrompt;
    }

    /**
     * Extract actual ingredients from the user prompt to create unique image
     * descriptions
     */
    private String extractIngredientsFromPrompt(String prompt) {
        log.info("Extracting ingredients from prompt: {}", prompt);

        // Check if prompt is in Hebrew
        boolean isHebrewPrompt = isHebrew(prompt);
        log.info("Prompt is in Hebrew: {}", isHebrewPrompt);

        // Look for ingredients list in the prompt (after "Use these ingredients:" or
        // similar)
        String[] lines = prompt.split("\\n");
        String ingredientsLine = "";

        for (String line : lines) {
            if (line.contains("ingredients:") || line.contains("מרכיבים")) {
                // Next line should contain the ingredients
                int currentIndex = java.util.Arrays.asList(lines).indexOf(line);
                if (currentIndex + 1 < lines.length) {
                    ingredientsLine = lines[currentIndex + 1].toLowerCase();
                    break;
                }
            }
            // Also check if current line contains comma-separated ingredients
            if (line.contains(",") && (line.contains("chicken") || line.contains("rice") ||
                    line.contains("tomato") || line.contains("onion") || line.contains("garlic") ||
                    line.contains("עוף") || line.contains("אורז") || line.contains("עגבניות"))) {
                ingredientsLine = line.toLowerCase();
                break;
            }
        }

        log.info("Found ingredients line: {}", ingredientsLine);

        if (ingredientsLine.isEmpty()) {
            // Fallback to searching entire prompt
            ingredientsLine = prompt;
        }

        StringBuilder result = new StringBuilder();
        int count = 0;

        if (isHebrewPrompt) {
            // Hebrew ingredients mapping to English
            String[][] hebrewToEnglish = {
                    // Proteins
                    { "עוף", "chicken" }, { "בקר", "beef" }, { "דג", "fish" }, { "ביצים", "eggs" }, { "טופו", "tofu" },
                    // Vegetables
                    { "עגבניות", "tomato" }, { "בצל", "onion" }, { "שום", "garlic" }, { "פלפל", "pepper" },
                    { "גזר", "carrot" }, { "ברוקולי", "broccoli" }, { "תרד", "spinach" }, { "פטריות", "mushroom" },
                    { "תפוחי אדמה", "potato" }, { "אבוקדו", "avocado" }, { "מלפפון", "cucumber" },
                    { "זוקיני", "zucchini" }, { "חציל", "eggplant" }, { "כרובית", "cauliflower" },
                    // Carbs
                    { "פסטה", "pasta" }, { "אורז", "rice" }, { "לחם", "bread" }, { "קינואה", "quinoa" },
                    { "שיבולת שועל", "oats" },
                    // Dairy
                    { "גבינה", "cheese" }, { "חלב", "milk" }, { "יוגורט", "yogurt" }, { "שמנת", "cream" },
                    { "חמאה", "butter" },
                    // Fruits
                    { "תפוח", "apple" }, { "בננה", "banana" }, { "תפוז", "orange" }, { "לימון", "lemon" },
                    { "תות", "strawberry" },
                    // Herbs & Spices
                    { "בזיליקום", "basil" }, { "אורגנו", "oregano" }, { "ג'ינג'ר", "ginger" },
                    { "כוסברה", "cilantro" }, { "פטרוזליה", "parsley" }
            };

            for (String[] pair : hebrewToEnglish) {
                String hebrew = pair[0];
                String english = pair[1];
                if (ingredientsLine.contains(hebrew) && count < 4) {
                    if (result.length() > 0) {
                        result.append("_");
                    }
                    result.append(english);
                    count++;
                }
            }
        } else {
            // English ingredients
            String[] commonIngredients = {
                    // Proteins
                    "chicken", "beef", "pork", "fish", "salmon", "tuna", "shrimp", "eggs", "tofu",
                    // Vegetables
                    "tomato", "onion", "garlic", "pepper", "carrot", "broccoli", "spinach", "mushroom",
                    "potato", "avocado", "cucumber", "lettuce", "zucchini", "eggplant", "cauliflower",
                    // Carbs
                    "pasta", "rice", "bread", "quinoa", "noodles", "oats",
                    // Dairy
                    "cheese", "milk", "yogurt", "cream", "butter",
                    // Fruits
                    "apple", "banana", "orange", "lemon", "strawberry",
                    // Herbs & Spices
                    "basil", "oregano", "ginger", "cilantro", "parsley"
            };

            for (String ingredient : commonIngredients) {
                if (ingredientsLine.contains(ingredient) && count < 4) {
                    if (result.length() > 0) {
                        result.append("_");
                    }
                    result.append(ingredient);
                    count++;
                }
            }
        }

        // If no ingredients found, use dish type
        if (result.length() == 0) {
            String dishType = extractDishInfo(prompt);
            result.append(dishType != null ? dishType : "gourmet_food");
        }

        String extractedIngredients = result.toString();
        log.info("Extracted ingredients for image: {}", extractedIngredients);

        return extractedIngredients;
    }

    /**
     * Extract dish type or main ingredients from user prompt
     */
    private String extractDishInfo(String prompt) {
        prompt = prompt.toLowerCase();
        boolean isHebrewPrompt = isHebrew(prompt);

        if (isHebrewPrompt) {
            // Hebrew dish types mapping to English
            String[][] hebrewDishTypes = {
                    { "פסטה", "pasta" }, { "פיצה", "pizza" }, { "המבורגר", "burger" }, { "סלט", "salad" },
                    { "מרק", "soup" }, { "סטייק", "steak" }, { "עוף", "chicken" }, { "דג", "fish" },
                    { "אורז", "rice" }, { "נודלס", "noodles" }, { "כריך", "sandwich" }, { "עוגה", "cake" },
                    { "לחם", "bread" }, { "קארי", "curry" }, { "מוקפץ", "stir_fry" }, { "טאקו", "tacos" },
                    { "סושי", "sushi" }, { "רמן", "ramen" }, { "פנקיק", "pancakes" }, { "ביצים", "eggs" },
                    { "ארוחת בוקר", "breakfast" }, { "קינוח", "dessert" }
            };

            for (String[] pair : hebrewDishTypes) {
                String hebrew = pair[0];
                String english = pair[1];
                if (prompt.contains(hebrew)) {
                    return english;
                }
            }
        } else {
            // English dish types
            String[] foodKeywords = {
                    "pasta", "pizza", "burger", "salad", "soup", "steak", "chicken", "fish",
                    "rice", "noodles", "sandwich", "cake", "bread", "curry", "stir_fry",
                    "tacos", "sushi", "ramen", "pancakes", "eggs", "breakfast", "dessert",
                    "beef", "pork", "lamb", "turkey", "salmon", "tuna", "shrimp", "lobster",
                    "tofu", "quinoa", "lentils", "beans", "avocado", "tomato", "mushroom",
                    "cheese", "chocolate", "vanilla", "strawberry", "apple", "banana"
            };

            StringBuilder dishInfo = new StringBuilder();
            int ingredientCount = 0;

            for (String keyword : foodKeywords) {
                if (prompt.contains(keyword) && ingredientCount < 3) { // Limit to 3 keywords for URL length
                    if (dishInfo.length() > 0) {
                        dishInfo.append("_");
                    }
                    dishInfo.append(keyword.replace(" ", "_"));
                    ingredientCount++;
                }
            }

            if (dishInfo.length() > 0) {
                return dishInfo.toString();
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