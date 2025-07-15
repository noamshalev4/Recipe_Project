import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the Recipe interface with imageUrl property
export interface Recipe {
  id: string;
  content: string;
  createdAt: Date;
  difficulty: string;
  timeRange: string;
  imageUrl?: string;
}

interface RecipeContextType {
  recipes: Recipe[];
  currentRecipe: Recipe | null;
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  setCurrentRecipe: (recipe: Recipe | null) => void;
  clearCurrentRecipe: () => void;
  deleteRecipe: (recipeId: string) => void;
}

const RECIPES_STORAGE_KEY = 'reciply_recipes';
const CURRENT_RECIPE_STORAGE_KEY = 'reciply_current_recipe';

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);

  // Load recipes and current recipe from localStorage on initial mount
  useEffect(() => {
    try {
      // Load recipes
      const storedRecipes = localStorage.getItem(RECIPES_STORAGE_KEY);
      if (storedRecipes) {
        const parsedRecipes: Recipe[] = JSON.parse(storedRecipes);

        // Convert string date back to Date objects
        const restoredRecipes = parsedRecipes.map(recipe => ({
          ...recipe,
          createdAt: new Date(recipe.createdAt)
        }));

        setRecipes(restoredRecipes);
      }

      // Load current recipe
      const storedCurrentRecipe = localStorage.getItem(CURRENT_RECIPE_STORAGE_KEY);
      if (storedCurrentRecipe) {
        const parsedCurrentRecipe: Recipe = JSON.parse(storedCurrentRecipe);

        // Convert string date back to Date object
        setCurrentRecipe({
          ...parsedCurrentRecipe,
          createdAt: new Date(parsedCurrentRecipe.createdAt)
        });
      }
    } catch (error) {
      console.error('Error loading recipes from localStorage:', error);
    }
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(recipes));
    } catch (error) {
      console.error('Error saving recipes to localStorage:', error);
    }
  }, [recipes]);

  // Save current recipe to localStorage whenever it changes
  useEffect(() => {
    try {
      if (currentRecipe) {
        localStorage.setItem(CURRENT_RECIPE_STORAGE_KEY, JSON.stringify(currentRecipe));
      } else {
        localStorage.removeItem(CURRENT_RECIPE_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving current recipe to localStorage:', error);
    }
  }, [currentRecipe]);

  const addRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe = {
      ...recipeData,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    setRecipes(prev => [...prev, newRecipe]);
    setCurrentRecipe(newRecipe);

    return newRecipe;
  };

  const clearCurrentRecipe = () => {
    setCurrentRecipe(null);
  };

  const deleteRecipe = (recipeId: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));

    // If the deleted recipe is the current one, clear it
    if (currentRecipe && currentRecipe.id === recipeId) {
      setCurrentRecipe(null);
    }
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        currentRecipe,
        addRecipe,
        setCurrentRecipe,
        clearCurrentRecipe,
        deleteRecipe
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};