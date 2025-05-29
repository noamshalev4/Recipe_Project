package com.example.demo.controllers;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    public String buildPrompt(String difficulty, String timeRange, Map<String, Object> ingredients, String language) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a ");
        if (difficulty != null && !difficulty.isEmpty()) {
            prompt.append(difficulty).append(" ");
        }
        prompt.append("recipe that takes ").append(timeRange).append(" to prepare. ");

        if (language != null && (language.equalsIgnoreCase("he") || language.equalsIgnoreCase("hebrew"))) {
            prompt.append("The instructions should be written in a tone that appeals to a male audience. ");
        }

        prompt.append("Use these ingredients:\n");

        if (ingredients != null) {
            ingredients.forEach((category, items) -> {
                if (items instanceof java.util.List) {
                    @SuppressWarnings("unchecked")
                    java.util.List<String> itemList = (java.util.List<String>) items;
                    if (!itemList.isEmpty()) {
                        prompt.append(category).append(": ").append(String.join(", ", itemList)).append("\n");
                    }
                } else if (items != null) {
                    prompt.append(category).append(": ").append(items.toString()).append("\n");
                }
            });
        }

        prompt.append("Provide the recipe in ").append(language == null || language.isEmpty() ? "en" : language).append(" with:\n");
        prompt.append("1. An appealing title\n");
        prompt.append("2. A brief description of the dish\n");
        prompt.append("3. Ingredients list with measurements\n");
        prompt.append("4. Clear step-by-step cooking instructions\n");
        prompt.append("5. Serving suggestions and tips");

        return prompt.toString();
    }
}