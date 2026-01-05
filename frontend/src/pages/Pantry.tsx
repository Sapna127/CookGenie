import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import PantryCategories from "../components/pantry/PantryCategories";
import PantryZone from "../components/pantry/PantryZone";
import RecipeCarousel from "../components/recipe/RecipeCarousel";
import InspirationDice from "../components//InspirationDice";
import { Button } from "../components/ui/button";
import { Moon, Sun } from "lucide-react";
import { getMockRecipes, getMockRecipesByPantryMode, getRandomMockRecipes } from "../data/mockDataService";
import type { DisplayRecipe } from "../types/recipe";

interface PantryItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
}

const Pantry = () => {
  const navigate = useNavigate();
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pantryRecipes = getMockRecipesByPantryMode(true);
  const [currentRecipes, setCurrentRecipes] = useState<DisplayRecipe[]>(pantryRecipes);

  const handleSelectRecipe = (recipe: DisplayRecipe) => {
    navigate(`/recipes/${recipe.id}`);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === "pantry-zone" && active.data.current) {
      const ingredient = active.data.current;

      // Check if ingredient already exists
      const existingItem = pantryItems.find(
        (item) => item.id === ingredient.id
      );

      if (existingItem) {
        // Increase quantity
        setPantryItems((items) =>
          items.map((item) =>
            item.id === ingredient.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        // Add new item
        setPantryItems((items) => [
          ...items,
          {
            id: ingredient.id,
            name: ingredient.name,
            emoji: ingredient.emoji,
            quantity: 1,
          },
        ]);
      }
    }
  };

  const removeFromPantry = (id: string) => {
    setPantryItems((items) => items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromPantry(id);
    } else {
      setPantryItems((items) =>
        items.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRandomRecipe = () => {
    const randomRecipes = getRandomMockRecipes(2);
    setCurrentRecipes([...randomRecipes, ...pantryRecipes]);
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
                  Drag your ingredients below and let AI suggest amazing
                  recipes!
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
            onSelectRecipe={handleSelectRecipe}
          />

          {pantryItems.length >= 3 && (
            <RecipeCarousel
              title="You Can Make These Now!"
              recipes={getMockRecipes().filter((recipe) =>
                recipe.ingredients.some((ingredient) =>
                  pantryItems.some((item) => item.name.toLowerCase() === ingredient.toLowerCase())
                )
              )}
              onSelectRecipe={handleSelectRecipe}
            />
          )}
        </div>

        {/* Floating Inspiration Dice */}
        <InspirationDice
         
          onRandomRecipe={handleRandomRecipe}
        />
      </div>
    </DndContext>
  );
};

export default Pantry;
