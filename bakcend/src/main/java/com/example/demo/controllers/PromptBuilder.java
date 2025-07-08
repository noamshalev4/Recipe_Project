package com.example.demo.controllers;

import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    public String buildPrompt(String difficulty, String timeRange, List<String> ingredients, String language) {
        boolean isHebrew = language != null
                && (language.equalsIgnoreCase("he") || language.equalsIgnoreCase("hebrew"));

        if (isHebrew) {
            return buildHebrewPrompt(difficulty, timeRange, ingredients);
        } else {
            return buildEnglishPrompt(difficulty, timeRange, ingredients, language);
        }
    }

    private String buildHebrewPrompt(String difficulty, String timeRange, List<String> ingredients) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("צור ");
        if (difficulty != null && !difficulty.isEmpty()) {
            prompt.append("מתכון ").append(difficulty).append(" ");
        } else {
            prompt.append("מתכון ");
        }
        prompt.append("שייקח בערך ").append(timeRange).append(" להכנה. ")
                .append("השתמש ברשימת המרכיבים הבאה:\n");
        if (ingredients != null && !ingredients.isEmpty()) {
            prompt.append(String.join(", ", ingredients)).append("\n");
        }
        prompt.append("הצג את המתכון בעברית הכולל:\n")
                .append("1\\. כותרת מושכת\n")
                .append("2\\. תיאור קצר של המנה\n")
                .append("3\\. רשימת מרכיבים עם כמויות\n")
                .append("4\\. הוראות שלב-אחר-שלב\n")
                .append("5\\. רעיונות להגשה וטיפים");
        return prompt.toString();
    }

    private String buildEnglishPrompt(String difficulty, String timeRange, List<String> ingredients, String language) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a ");
        if (difficulty != null && !difficulty.isEmpty()) {
            prompt.append(difficulty).append(" ");
        }
        prompt.append("recipe that takes ").append(timeRange).append(" to prepare. ");
        prompt.append("Use these ingredients:\n");
        if (ingredients != null && !ingredients.isEmpty()) {
            prompt.append(String.join(", ", ingredients)).append("\n");
        }
        prompt.append("Provide the recipe in ")
                .append(language == null || language.isEmpty() ? "en" : language)
                .append(" with:\n")
                .append("1\\. An appealing title\n")
                .append("2\\. A brief description of the dish\n")
                .append("3\\. Ingredients list with measurements\n")
                .append("4\\. Clear step-by-step cooking instructions\n")
                .append("5\\. Serving suggestions and tips");
        return prompt.toString();
    }
}