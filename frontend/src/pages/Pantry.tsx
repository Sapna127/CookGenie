import { useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import PantryCategories from '../components/pantry/PantryCategories';
import PantryZone from '../components/pantry/PantryZone';
import RecipeCarousel from '../components/recipe/RecipeCarousel';
import InspirationDice from '../components//InspirationDice';
import { Button } from '../components/ui/button';
import { Moon, Sun } from 'lucide-react';


interface PantryItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
}

const SAMPLE_RECIPES = [
  {
    id: 'pasta-marinara',
    title: 'Fresh Tomato Basil Pasta',
    description: 'A classic Italian dish with fresh tomatoes, basil, and garlic',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
    cookTime: 20,
    servings: 4,
    difficulty: 'Easy' as const,
    tags: ['Italian', 'Vegetarian', 'Quick'],
    ingredients: ['pasta', 'tomato', 'basil', 'garlic'],
    rating: 4.8,
  },
  {
    id: 'grilled-salmon',
    title: 'Herb-Crusted Salmon',
    description: 'Perfectly grilled salmon with fresh herbs and roasted vegetables',
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    cookTime: 25,
    servings: 2,
    difficulty: 'Medium' as const,
    tags: ['Seafood', 'Healthy', 'Low Carb'],
    ingredients: ['salmon', 'herbs', 'vegetables'],
    rating: 4.9,
  },
  {
    id: 'veggie-stirfry',
    title: 'Rainbow Vegetable Stir Fry',
    description: 'Colorful mix of fresh vegetables in a savory stir fry sauce',
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    cookTime: 15,
    servings: 3,
    difficulty: 'Easy' as const,
    tags: ['Vegetarian', 'Quick', 'Healthy'],
    ingredients: ['bell-pepper', 'carrot', 'onion', 'garlic'],
    rating: 4.6,
  },
];

const RANDOM_RECIPES = [
  {
    id: 'chicken-curry',
    title: 'Coconut Chicken Curry',
    description: 'Creamy coconut curry with tender chicken and aromatic spices',
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", 
    cookTime: 35,
    servings: 4,
    difficulty: 'Medium' as const,
    tags: ['Indian', 'Spicy', 'Comfort Food'],
    ingredients: ['chicken', 'coconut', 'spices'],
    rating: 4.7,
  },
  {
    id: 'beef-tacos',
    title: 'Street-Style Beef Tacos',
    description: 'Authentic Mexican tacos with seasoned beef and fresh toppings',
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop", // Using placeholder
    cookTime: 30,
    servings: 6,
    difficulty: 'Easy' as const,
    tags: ['Mexican', 'Street Food', 'Crowd Pleaser'],
    ingredients: ['beef', 'tortillas', 'onion', 'spices'],
    rating: 4.5,
  },
];

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentRecipes, setCurrentRecipes] = useState(SAMPLE_RECIPES);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && over.id === 'pantry-zone' && active.data.current) {
      const ingredient = active.data.current;
      
      // Check if ingredient already exists
      const existingItem = pantryItems.find(item => item.id === ingredient.id);
      
      if (existingItem) {
        // Increase quantity
        setPantryItems(items =>
          items.map(item =>
            item.id === ingredient.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        // Add new item
        setPantryItems(items => [
          ...items,
          {
            id: ingredient.id,
            name: ingredient.name,
            emoji: ingredient.emoji,
            quantity: 1,
          }
        ]);
      }
    }
  };

  const removeFromPantry = (id: string) => {
    setPantryItems(items => items.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromPantry(id);
    } else {
      setPantryItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_RECIPES.length);
    const randomRecipe = RANDOM_RECIPES[randomIndex];
    setCurrentRecipes([randomRecipe, ...SAMPLE_RECIPES]);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-background">
        {/* Header
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-lg">🍳</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Smart Pantry</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="w-10 h-10 p-0"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </header> */}

        {/* Hero Section */}
        <section className="relative h-64 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1592178036777-6cb668714b72?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Kitchen Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-lg">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  What's cooking today?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Drag your ingredients below and let AI suggest amazing recipes!
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 space-y-12">
          {/* Pantry Management Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PantryCategories />
            </div>
            <div className="lg:col-span-1">
              <PantryZone
                items={pantryItems}
                onAddItem={() => {}} // Handled by drag and drop
                onRemoveItem={removeFromPantry}
                onUpdateQuantity={updateQuantity}
              />
            </div>
          </div>

          {/* Recipe Suggestions */}
          <RecipeCarousel
            title="Recommended for You"
            recipes={currentRecipes}
            onSelectRecipe={(recipe) => console.log('Selected recipe:', recipe)}
          />
          
          {pantryItems.length >= 3 && (
            <RecipeCarousel
              title="You Can Make These Now!"
              recipes={SAMPLE_RECIPES.filter(recipe => 
                recipe.ingredients.some(ingredient => 
                  pantryItems.some(item => item.id === ingredient)
                )
              )}
              onSelectRecipe={(recipe) => console.log('Selected recipe:', recipe)}
            />
          )}
        </div>

        {/* Floating Inspiration Dice */}
        <InspirationDice onRandomRecipe={handleRandomRecipe} />
      </div>
    </DndContext>
  );
};

export default Pantry;