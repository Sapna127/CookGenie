import type { BackendRecipe, DisplayRecipe, Difficulty } from "../types/recipe";

/**
 * Generate a placeholder image URL based on recipe title
 */
function generateImageUrl(title: string): string {
  // Use Unsplash API with recipe title as search term
  const searchTerm = encodeURIComponent(title.toLowerCase().split(" ")[0]);
  return `https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80`;
}

/**
 * Generate a description from recipe title and tags
 */
function generateDescription(recipe: BackendRecipe): string {
  const tagList = recipe.tags?.join(", ") || "";
  return `A delicious ${recipe.title.toLowerCase()}${tagList ? ` with ${tagList} flavors` : ""}. Perfect for any occasion.`;
}

/**
 * Calculate cooking time based on instructions length
 */
function calculateCookTime(instructions: string): number {
  // Count steps (lines starting with numbers)
  const stepCount = (instructions.match(/^\d+\./gm) || []).length;
  // Base time: 15 minutes + 5 minutes per step
  return Math.max(15, Math.min(60, 15 + stepCount * 5));
}

/**
 * Calculate servings based on ingredients count
 */
function calculateServings(ingredients: string[]): number {
  // Base servings: 2-4 based on ingredient count
  const count = ingredients.length;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

/**
 * Determine difficulty based on ingredients and instructions
 */
function calculateDifficulty(recipe: BackendRecipe): Difficulty {
  const ingredientCount = recipe.ingredients.length;
  const instructionLength = recipe.instructions.length;
  const stepCount = (recipe.instructions.match(/^\d+\./gm) || []).length;

  // Easy: few ingredients, short instructions, few steps
  if (ingredientCount <= 6 && instructionLength < 500 && stepCount <= 5) {
    return "Easy";
  }

  // Hard: many ingredients, long instructions, many steps
  if (ingredientCount > 10 || instructionLength > 1000 || stepCount > 10) {
    return "Hard";
  }

  // Medium: everything else
  return "Medium";
}

/**
 * Generate a rating based on recipe complexity and tags
 */
function calculateRating(recipe: BackendRecipe): number {
  let rating = 4.5; // Base rating

  // Boost rating for popular tags
  const popularTags = ["Quick", "Healthy", "Vegetarian", "Comfort Food"];
  const hasPopularTag = recipe.tags?.some((tag) =>
    popularTags.includes(tag)
  );
  if (hasPopularTag) rating += 0.2;

  // Slight boost for pantry mode recipes
  if (recipe.pantry_mode) rating += 0.1;

  // Randomize slightly for variety (between 4.3 and 4.9)
  const randomFactor = (Math.random() * 0.6 - 0.3);
  rating += randomFactor;

  return Math.round(rating * 10) / 10; // Round to 1 decimal place
}

/**
 * Transform a BackendRecipe to DisplayRecipe
 * Adds display-only fields like image, description, cookTime, etc.
 */
export function transformRecipe(recipe: BackendRecipe): DisplayRecipe {
  if (!recipe.id) {
    throw new Error("Recipe must have an id");
  }

  return {
    id: recipe.id,
    title: recipe.title,
    description: generateDescription(recipe),
    image: generateImageUrl(recipe.title),
    cookTime: calculateCookTime(recipe.instructions),
    servings: calculateServings(recipe.ingredients),
    difficulty: calculateDifficulty(recipe),
    tags: recipe.tags || [],
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    substitutions: recipe.substitutions,
    pantry_mode: recipe.pantry_mode,
    rating: calculateRating(recipe),
    created_at: recipe.created_at,
    created_by: recipe.created_by,
  };
}

/**
 * Transform an array of BackendRecipes to DisplayRecipes
 */
export function transformRecipes(recipes: BackendRecipe[]): DisplayRecipe[] {
  return recipes.map(transformRecipe);
}

