import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Clock, Users, ChefHat, Eye } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  rating: number;
  description: string;
}

const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Spicy Garlic Shrimp Pasta",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
    time: "25 min",
    servings: 4,
    difficulty: "Easy",
    tags: ["Seafood", "Pasta", "Quick"],
    rating: 4.8,
    description:
      "A delicious and quick pasta dish with perfectly seasoned shrimp",
  },
  {
    id: "2",
    title: "Mediterranean Chicken Bowl",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    time: "35 min",
    servings: 2,
    difficulty: "Medium",
    tags: ["Healthy", "Mediterranean", "Protein"],
    rating: 4.6,
    description:
      "Fresh and healthy bowl with grilled chicken and Mediterranean flavors",
  },
  {
    id: "3",
    title: "Classic Beef Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    time: "20 min",
    servings: 4,
    difficulty: "Easy",
    tags: ["Comfort Food", "Beef", "American"],
    rating: 4.9,
    description: "Juicy homemade beef burger with all the classic toppings",
  },
  {
    id: "4",
    title: "Thai Green Curry",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
    time: "40 min",
    servings: 4,
    difficulty: "Medium",
    tags: ["Thai", "Spicy", "Coconut"],
    rating: 4.7,
    description:
      "Authentic Thai green curry with vegetables and aromatic spices",
  },
  {
    id: "5",
    title: "Chocolate Lava Cake",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    time: "30 min",
    servings: 2,
    difficulty: "Hard",
    tags: ["Dessert", "Chocolate", "Baking"],
    rating: 4.9,
    description: "Decadent chocolate dessert with a molten center",
  },
  {
    id: "6",
    title: "Fresh Caesar Salad",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    time: "15 min",
    servings: 4,
    difficulty: "Easy",
    tags: ["Salad", "Healthy", "Quick"],
    rating: 4.4,
    description:
      "Crisp romaine lettuce with homemade caesar dressing and croutons",
  },
];

const Recipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    // Here you would typically navigate to a detailed recipe page
    // For now, we'll just log it
    console.log("Viewing recipe:", recipe);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Recipe Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Recipe Collection
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover amazing recipes created by AI and loved by home cooks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className={`absolute top-3 right-3 ${getDifficultyColor(
                    recipe.difficulty
                  )}`}
                >
                  {recipe.difficulty}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg font-semibold line-clamp-1">
                  {recipe.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {recipe.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ChefHat className="w-4 h-4" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleViewRecipe(recipe)}
                  className="w-full"
                  variant="default"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Recipe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
