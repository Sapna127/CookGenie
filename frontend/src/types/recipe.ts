/**
 * Backend Recipe Interface
 * Matches the backend API response format
 */
export interface BackendRecipe {
  id?: string;
  title: string;
  ingredients: string[];
  substitutions?: Record<string, string[]>;
  instructions: string;
  tags?: string[];
  pantry_mode?: boolean;
  created_at?: string;
  created_by?: string;
}

/**
 * Display Recipe Interface
 * Used by frontend components for rendering
 * Includes additional display-only fields
 */
export interface DisplayRecipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  ingredients: string[];
  instructions: string;
  substitutions?: Record<string, string[]>;
  pantry_mode?: boolean;
  rating: number;
  created_at?: string;
  created_by?: string;
}

/**
 * Recipe difficulty levels
 */
export type Difficulty = "Easy" | "Medium" | "Hard";

/**
 * Helper type for recipe creation (without id)
 */
export type RecipeInput = Omit<BackendRecipe, "id" | "created_at">;
