package com.example.demo.services;

import com.example.demo.exceptions.RecipeBookException;
import com.example.demo.repositories.IngredientRepository;
import com.example.demo.repositories.RecipeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RecipeBookServiceTest {
    @InjectMocks // Creates an instance of the class and injects the mocks that are created with the @Mock annotation into this instance.
    RecipeBookService recipeBookService;

    @Mock
    IngredientRepository ingredientRepository;

    @Mock
    RecipeRepository recipeRepository;


    @BeforeEach // JUnit 5 annotation that indicates that the method should be run before each test.
    void setup() { //Best Practice using setup() method
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createRecipe() {
    }

    @Test
    void getRecipe() {
    }

    @Test
    void getAllRecipes() {
    }

    @Test
    void updateRecipe() {
    }

    @Test
    void deleteRecipe() {
        assertThrows(RecipeBookException.class, () -> recipeBookService.deleteRecipe(1L));
    }

    @Test
    void createIngredient() {
    }

    @Test
    void addIngredientToRecipe() {
    }

    @Test
    void addIngredientsToRecipe() {
    }

    @Test
    void getIngredient() {
    }

    @Test
    void getAllIngredients() {
    }

    @Test
    void updateIngredient() {
    }

    @Test
    void deleteIngredient() {
    }
}