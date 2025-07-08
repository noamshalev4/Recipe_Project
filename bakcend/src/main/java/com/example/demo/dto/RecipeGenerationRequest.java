package com.example.demo.dto;

import java.util.List;

public class RecipeGenerationRequest {
    private String difficulty;
    private String timeRange;
    private List<String> ingredients;
    private String language;

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
    public List<String> getIngredients() {
        return ingredients;
    }
    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
    public String getLanguage() {
        return language;
    }
    public void setLanguage(String language) {
        this.language = language;
    }
}