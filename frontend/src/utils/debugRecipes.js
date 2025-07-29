// Debugging utility to check localStorage recipes
// Run this in browser console to debug image issues

function debugRecipeImages() {
    const recipesData = localStorage.getItem('reciply_recipes');
    if (recipesData) {
        const recipes = JSON.parse(recipesData);
        console.log('=== RECIPE IMAGES DEBUG ===');
        console.log('Total recipes:', recipes.length);

        recipes.forEach((recipe, index) => {
            console.log(`Recipe ${index + 1}:`, {
                id: recipe.id,
                createdAt: recipe.createdAt,
                imageUrl: recipe.imageUrl,
                difficulty: recipe.difficulty,
                timeRange: recipe.timeRange
            });
        });

        // Check for duplicate image URLs
        const imageUrls = recipes.map(r => r.imageUrl).filter(Boolean);
        const uniqueUrls = [...new Set(imageUrls)];

        console.log('Total image URLs:', imageUrls.length);
        console.log('Unique image URLs:', uniqueUrls.length);

        if (imageUrls.length !== uniqueUrls.length) {
            console.warn('⚠️ DUPLICATE IMAGE URLS FOUND!');
            console.log('All URLs:', imageUrls);
            console.log('Unique URLs:', uniqueUrls);
        } else {
            console.log('✅ All image URLs are unique');
        }
    } else {
        console.log('No recipes found in localStorage');
    }
}

function clearAllRecipes() {
    localStorage.removeItem('reciply_recipes');
    localStorage.removeItem('reciply_current_recipe');
    console.log('✅ All recipes cleared from localStorage');
    window.location.reload();
}

// Export functions to window for console access
window.debugRecipeImages = debugRecipeImages;
window.clearAllRecipes = clearAllRecipes;

console.log('Debug functions loaded. Use:');
console.log('- debugRecipeImages() to check image URLs');
console.log('- clearAllRecipes() to clear all stored recipes');
