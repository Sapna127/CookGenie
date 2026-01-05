import mockData from "./mockData.json";
import type { BackendRecipe, DisplayRecipe } from "../types/recipe";
import { transformRecipe, transformRecipes } from "../utils/recipeTransform";

/**
 * Mock Data Service
 * Provides access to mock recipe data
 * This service can be easily replaced with API calls later
 */

/**
 * Get all mock recipes as DisplayRecipe format
 */
export function getMockRecipes(): DisplayRecipe[] {
  const backendRecipes = mockData.recipes as BackendRecipe[];
  return transformRecipes(backendRecipes);
}

/**
 * Get a single mock recipe by ID as DisplayRecipe format
 */
export function getMockRecipeById(id: string): DisplayRecipe | undefined {
  const backendRecipes = mockData.recipes as BackendRecipe[];
  const recipe = backendRecipes.find((r) => r.id === id);
  return recipe ? transformRecipe(recipe) : undefined;
}

/**
 * Get all mock recipes as BackendRecipe format (for API compatibility)
 */
export function getMockRecipesBackend(): BackendRecipe[] {
  return mockData.recipes as BackendRecipe[];
}

/**
 * Get a single mock recipe by ID as BackendRecipe format (for API compatibility)
 */
export function getMockRecipeByIdBackend(
  id: string
): BackendRecipe | undefined {
  const backendRecipes = mockData.recipes as BackendRecipe[];
  return backendRecipes.find((r) => r.id === id);
}

/**
 * Get random mock recipes
 */
export function getRandomMockRecipes(count: number): DisplayRecipe[] {
  const allRecipes = getMockRecipes();
  const shuffled = [...allRecipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Search mock recipes by title or tags
 */
export function searchMockRecipes(query: string): DisplayRecipe[] {
  const allRecipes = getMockRecipes();
  const lowerQuery = query.toLowerCase();

  return allRecipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      recipe.ingredients.some((ing) => ing.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get recipes filtered by pantry mode
 */
export function getMockRecipesByPantryMode(
  pantryMode: boolean
): DisplayRecipe[] {
  const allRecipes = getMockRecipes();
  return allRecipes.filter((recipe) => recipe.pantry_mode === pantryMode);
}
