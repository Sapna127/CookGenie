const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Recipe {
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

export interface User {
  id?: string;
  username: string;
  email: string;
  pantry: string[];
  saved_recipes: string[];
  created_at?: string;
}

// Recipe API functions
export const recipeAPI = {
  // Generate recipe using AI
  async generateRecipe(ingredients: string[]): Promise<Recipe> {
    const response = await fetch(`${API_BASE_URL}/api/v1/generate-gemini`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredients),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate recipe');
    }

    return response.json();
  },

  // Get all recipes
  async getAllRecipes(limit: number = 10): Promise<Recipe[]> {
    const response = await fetch(`${API_BASE_URL}/recipes?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    return response.json();
  },

  // Get recipe by ID
  async getRecipeById(id: string): Promise<Recipe> {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }

    return response.json();
  },

  // Create recipe
  async createRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create recipe');
    }

    return response.json();
  },
};

// User API functions
export const userAPI = {
  // Create user
  async createUser(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create user');
    }

    return response.json();
  },

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  },
};