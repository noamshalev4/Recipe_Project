import axios from 'axios';
import i18n from '../Components/i18n/i18n';

// const response = await axios.post('http://localhost:8080/api/generate-recipe', {
//     ingredients
//   });

// Define interface for the request payload
interface RecipeGenerationRequest {
    difficulty: string;
    timeRange: string;
    ingredients: {
      protein: string[];
      carbohydrates: string[];
      fats: string[];
      vegetables: string[];
      fruits: string[];
      dryFruits: string[];
      dairyProducts: string[];
      spicesAndHerbs: string[];
      sweeteners: string[];
      liquidsAndAdditionalIngredients: string[];
    };
    language: string; // Optional: include user's language preference
  }
  
  // Define interface for the response
  interface RecipeGenerationResponse {
    id?: string;
    title: string;
    description: string;
    steps: string[];
    preparationTime: string;
    difficulty: string;
    ingredients: {
      name: string;
      amount: string;
      unit: string;
    }[];
    imageUrl?: string;
    tags?: string[];
  }
  
  // Function to send the recipe generation request
  const generateRecipe = async () => {
    try {
      // Map the form data to the request format
      const requestData: RecipeGenerationRequest = {
        difficulty: difficulty, // From your state
        timeRange: timeRange,   // From your state
        ingredients: {
          protein: selectedIngredients[IngredientCategory.PROTEIN],
          carbohydrates: selectedIngredients[IngredientCategory.CARBOHYDRATES],
          fats: selectedIngredients[IngredientCategory.FATS],
          vegetables: selectedIngredients[IngredientCategory.VEGETABLES],
          fruits: selectedIngredients[IngredientCategory.FRUITS],
          dryFruits: selectedIngredients[IngredientCategory.Dry_FRUITS],
          dairyProducts: selectedIngredients[IngredientCategory.DAIRY_PRODUCTS],
          spicesAndHerbs: selectedIngredients[IngredientCategory.SPICES_AND_HERBS],
          sweeteners: selectedIngredients[IngredientCategory.SWEETENERS],
          liquidsAndAdditionalIngredients: selectedIngredients[IngredientCategory.LIQUIDS_AND_ADDITIONAL_INGREDIENTS],
        },
        language: i18n.language // The user's current language preference
      };
  
      // Set up loading state if needed
      setIsLoading(true);
      
      // Make the API call
      const response = await axios.post<RecipeGenerationResponse>(
        'http://localhost:8080/api/generate-recipe',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            // Add authorization if your API requires it
            // 'Authorization': `Bearer ${token}`
          },
          timeout: 30000 // 30 seconds timeout for recipe generation
        }
      );
  
      // Process successful response
      setIsLoading(false);
      
      // Store the generated recipe
      setGeneratedRecipe(response.data);
      
      // Show success message
      toast.success("Recipe generated successfully!");
      
      // Navigate to recipe display page
      navigate(`/recipe/${response.data.id}`);
      
      return response.data;
    } catch (error) {
      // Handle errors
      setIsLoading(false);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with an error status
          console.error("Server error:", error.response.data);
          toast.error(`Server error: ${error.response.data.message || "Failed to generate recipe"}`);
        } else if (error.request) {
          // Request was made but no response received
          console.error("Network error:", error.request);
          toast.error("Network error: Cannot connect to the server");
        } else {
          // Something happened in setting up the request
          console.error("Request error:", error.message);
          toast.error("Error sending request");
        }
      } else {
        // Non-Axios error
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
      
      return null;
    }
  };