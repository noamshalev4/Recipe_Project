package com.example.demo.dto;

import java.util.Map;

// Assuming your request body for ingredients is Map<String, List<String>> or similar
// For simplicity, I'll use Map<String, Object> here. Adjust as per your actual frontend structure.
public class RecipeGenerationRequest {
    private String difficulty;
    private String timeRange;
    private Map<String, Object> ingredients;
    private String language;

    // Getters and Setters
    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getTimeRange() {
        return timeRange;
    }

    public void setTimeRange(String timeRange) {
        this.timeRange = timeRange;
    }

    public Map<String, Object> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Map<String, Object> ingredients) {
        this.ingredients = ingredients;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}