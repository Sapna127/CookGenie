import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Carrot, Fish, Wheat, Sparkles } from "lucide-react";
import AddIngredients from "./AddIngredients";
import Typography from "@mui/material/Typography";
interface Ingredient {
  id: string;
  name: string;
  category: string;
  emoji: string;
}

const INGREDIENTS_BY_CATEGORY = {
  vegetables: [
    { id: "tomato", name: "Tomato", category: "vegetables", emoji: "🍅" },
    { id: "onion", name: "Onion", category: "vegetables", emoji: "🧅" },
    { id: "garlic", name: "Garlic", category: "vegetables", emoji: "🧄" },
    {
      id: "bell-pepper",
      name: "Bell Pepper",
      category: "vegetables",
      emoji: "🫑",
    },
    { id: "spinach", name: "Spinach", category: "vegetables", emoji: "🥬" },
    { id: "carrot", name: "Carrot", category: "vegetables", emoji: "🥕" },
  ],
  proteins: [
    { id: "chicken", name: "Chicken", category: "proteins", emoji: "🐔" },
    { id: "beef", name: "Beef", category: "proteins", emoji: "🥩" },
    { id: "salmon", name: "Salmon", category: "proteins", emoji: "🐟" },
    { id: "eggs", name: "Eggs", category: "proteins", emoji: "🥚" },
    { id: "tofu", name: "Tofu", category: "proteins", emoji: "🧈" },
  ],
  grains: [
    { id: "rice", name: "Rice", category: "grains", emoji: "🍚" },
    { id: "pasta", name: "Pasta", category: "grains", emoji: "🍝" },
    { id: "bread", name: "Bread", category: "grains", emoji: "🍞" },
    { id: "quinoa", name: "Quinoa", category: "grains", emoji: "🌾" },
  ],
  spices: [
    { id: "salt", name: "Salt", category: "spices", emoji: "🧂" },
    { id: "pepper", name: "Black Pepper", category: "spices", emoji: "⚫" },
    { id: "basil", name: "Basil", category: "spices", emoji: "🌿" },
    { id: "oregano", name: "Oregano", category: "spices", emoji: "🌿" },
    { id: "paprika", name: "Paprika", category: "spices", emoji: "🌶️" },
  ],
};

const CATEGORY_ICONS = {
  vegetables: Carrot,
  proteins: Fish,
  grains: Wheat,
  spices: Sparkles,
};

const CATEGORY_COLORS = {
  vegetables:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  proteins: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  grains:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  spices:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

function DraggableIngredient({ ingredient }: { ingredient: Ingredient }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: ingredient.id,
      data: ingredient,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`ingredient-chip ${isDragging ? "opacity-50 z-50" : ""}`}
    >
      <span className="text-lg">{ingredient.emoji}</span>
      <span>{ingredient.name}</span>
    </div>
  );
}

export default function PantryCategories() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">
        Available Ingredients
      </h2>
      <AddIngredients />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(INGREDIENTS_BY_CATEGORY).map(
          ([categoryKey, ingredients]) => {
            const category = categoryKey as keyof typeof CATEGORY_ICONS;
            const IconComponent = CATEGORY_ICONS[category];

            return (
              <Card key={category} className="h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg capitalize">
                    <IconComponent className="w-5 h-5" />
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ingredients ? (
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((ingredient) => (
                        <DraggableIngredient
                          key={ingredient.id}
                          ingredient={ingredient}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <Typography variant="body1">
                        No ingredients found
                      </Typography>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
}
