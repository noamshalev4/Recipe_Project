package com.example.demo.services;

import com.example.demo.entities.Ingredient;
import com.example.demo.entities.Recipe;
import com.example.demo.exceptions.RecipeBookException;
import com.example.demo.repositories.IngredientRepository;
import com.example.demo.repositories.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class RecipeBookService {
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

    //Recipe CRUD:
    @Transactional
    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Recipe getRecipe(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    public Set<Recipe> getAllRecipes() {
        return Set.copyOf(recipeRepository.findAll());
    }

    @Transactional
    public Recipe updateRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @Transactional
    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }

    //Ingredient CRUD:
    @Transactional
    public Ingredient createIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    @Transactional
    public void addIngredientToRecipe(Long recipeId, Long ingredientId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(()->new RecipeBookException("Recipe not found"));
        Ingredient ingredient = ingredientRepository.findById(ingredientId).orElseThrow(()->new RecipeBookException("Ingredient not found"));
        recipe.getIngredients().add(ingredient);
    }

    @Transactional
    public void addIngredientsToRecipe(Long recipeId, Set<Ingredient> ingredients) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(()->new RecipeBookException("Recipe not found"));
        recipe.getIngredients().addAll(ingredients);
    }

    public Ingredient getIngredient(Long id) {
        return ingredientRepository.findById(id).orElseThrow(() -> new RecipeBookException("Ingredient not found"));
    }

    public Set<Ingredient> getAllIngredients() {
        return Set.copyOf(ingredientRepository.findAll());
    }

    @Transactional
    public Ingredient updateIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    @Transactional
    public void deleteIngredient(Long id) {
        ingredientRepository.deleteById(id);
    }
}
