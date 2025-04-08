package com.example.demo;

import com.example.demo.controllers.RecipeBookController;
import com.example.demo.entities.DietType;
import com.example.demo.entities.Recipe;
import com.example.demo.services.RecipeBookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class RecipeProjectApplicationTests {

	private MockMvc mockMvc;

	@Mock
	private RecipeBookService recipeBookService;

	@InjectMocks
	private RecipeBookController recipeBookController;

	private final ObjectMapper objectMapper = new ObjectMapper();

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(recipeBookController).build();
	}

	@Test
	void contextLoads() {
	}


	@Test
	void createRecipe() throws Exception {
		// Given: Creating a valid Recipe object
		Recipe recipe = Recipe.builder()
				.id(1L) // ID is optional for creation, but it's good for response testing
				.name("Pasta")
				.description("A delicious pasta recipe")
				.instructions("Boil pasta, add sauce")
				.difficultyLevel("Easy")
				.preparationTime(10)
				.cookingTime(15)
				.additionalTime(5)
				.totalTime(30)
				.servings((byte) 2)
				.dietType(DietType.VEGETARIAN)
				.imageURL("http://example.com/image.jpg")
				.build();

		when(recipeBookService.createRecipe(any(Recipe.class))).thenReturn(recipe);

		// Debugging: Print JSON before sending
		String jsonPayload = objectMapper.writeValueAsString(recipe);
		System.out.println("JSON Payload: " + jsonPayload);

		// When & Then: Sending a valid JSON request
		mockMvc.perform(post("/api/v1/recipe-book/recipe")
						.contentType(MediaType.APPLICATION_JSON)
						.content(jsonPayload)) // Ensure JSON is not null
				.andExpect(status().isOk()) // Ensure the response is 200 OK
				.andExpect(jsonPath("$.id").value(1))
				.andExpect(jsonPath("$.name").value("Pasta"))
				.andExpect(jsonPath("$.description").value("A delicious pasta recipe"))
				.andExpect(jsonPath("$.instructions").value("Boil pasta, add sauce"))
				.andExpect(jsonPath("$.difficultyLevel").value("Easy"))
				.andExpect(jsonPath("$.preparationTime").value(10))
				.andExpect(jsonPath("$.cookingTime").value(15))
				.andExpect(jsonPath("$.totalTime").value(30))
				.andExpect(jsonPath("$.servings").value(2))
				.andExpect(jsonPath("$.dietType").value("VEGETARIAN"))
				.andExpect(jsonPath("$.imageURL").value("http://example.com/image.jpg"));
	}

}
