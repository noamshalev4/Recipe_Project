package com.example.demo.controllers;

import com.example.demo.entities.Ingredient;
import com.example.demo.entities.Recipe;
import com.example.demo.exceptions.RecipeBookException;
import com.example.demo.repositories.RecipeRepository;
import com.example.demo.services.RecipeBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/recipe-book")
@RequiredArgsConstructor
public class RecipeBookController {

    private final RecipeBookService recipeBookService;

    @PostMapping("/recipe")
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeBookService.createRecipe(recipe);
    }

    @GetMapping("/recipe/{id}")
    public Recipe getRecipe(@PathVariable Long id) {
        return recipeBookService.getRecipe(id);
    }

    @GetMapping("/recipes")
    public Set<Recipe> getAllRecipes() {
        return (Set<Recipe>) recipeBookService.getAllRecipes();
    }

    @PutMapping("/recipe")
    public Recipe updateRecipe(@RequestBody Recipe recipe) {
        return recipeBookService.updateRecipe(recipe);
    }

    @DeleteMapping("/recipe/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeBookService.deleteRecipe(id);
    }

    //Ingredient CRUD:
    @PostMapping("/ingredient")
    public Ingredient createIngredient(@PathVariable Ingredient ingredient) {
        return recipeBookService.createIngredient(ingredient);
    }

    @PostMapping("/recipe/{recipeId}/ingredient/{ingredientId}")
    public void addIngredientToRecipe(@PathVariable Long recipeId,@PathVariable Long ingredientId) {
        recipeBookService.addIngredientToRecipe(recipeId, ingredientId);
    }

    @PostMapping("/recipe/{recipeId}/ingredients")
    public void addIngredientsToRecipe(@PathVariable Long recipeId,@PathVariable Set<Ingredient> ingredients) {
        recipeBookService.addIngredientsToRecipe(recipeId, ingredients);
    }

    @PostMapping("/ingredient/{id}")
    public Ingredient getIngredient(@PathVariable Long id) {
        return recipeBookService.getIngredient(id);
    }

    @PostMapping("/ingredients")
    public Set<Ingredient> getAllIngredients() {
        return (Set<Ingredient>) recipeBookService.getAllIngredients();
    }

    @PutMapping("/ingredient")
    public Ingredient updateIngredient(@RequestBody Ingredient ingredient) {
        return recipeBookService.updateIngredient(ingredient);
    }

    @DeleteMapping("/ingredient/{id}")
    public void deleteIngredient(@PathVariable Long id) {
        recipeBookService.deleteIngredient(id);
    }
}
