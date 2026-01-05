import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Clock,
  Users,
  ChefHat,
  Star,
  ArrowLeft,
  Bookmark,
  Share2,
  CheckCircle2,
  Circle,
  UtensilsCrossed,
} from "lucide-react";
import { getMockRecipeById } from "../data/mockDataService";
import type { DisplayRecipe } from "../types/recipe";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<DisplayRecipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(
    new Set()
  );
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (id) {
      const foundRecipe = getMockRecipeById(id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      }
    }
  }, [id]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleIngredient = (ingredient: string) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(ingredient)) {
      newChecked.delete(ingredient);
    } else {
      newChecked.add(ingredient);
    }
    setCheckedIngredients(newChecked);
  };

  const parseInstructions = (instructions: string): string[] => {
    // Split by numbered steps (1., 2., etc.) or newlines
    const steps = instructions
      .split(/\d+\./)
      .filter((step) => step.trim().length > 0)
      .map((step) => step.trim());
    return steps.length > 0 ? steps : [instructions];
  };

  const handleShare = async () => {
    if (navigator.share && recipe) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this recipe: ${recipe.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
          <Button onClick={() => navigate("/recipes")}>Back to Recipes</Button>
        </div>
      </div>
    );
  }

  const instructions = parseInstructions(recipe.instructions);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/recipes")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Recipes
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "bg-accent" : ""}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getDifficultyColor(recipe.difficulty)}>
                {recipe.difficulty}
              </Badge>
              {recipe.pantry_mode && (
                <Badge variant="secondary">Pantry Mode</Badge>
              )}
              <div className="flex items-center gap-1 ml-auto">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{recipe.rating}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              {recipe.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredients */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5" />
                  Ingredients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{recipe.cookTime} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>

                {/* Ingredients List */}
                <div className="space-y-2">
                  {recipe.ingredients.map((ingredient) => (
                    <div
                      key={ingredient}
                      className="flex items-center gap-2 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors"
                      onClick={() => toggleIngredient(ingredient)}
                    >
                      {checkedIngredients.has(ingredient) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span
                        className={
                          checkedIngredients.has(ingredient)
                            ? "line-through text-muted-foreground"
                            : ""
                        }
                      >
                        {ingredient}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Substitutions */}
                {recipe.substitutions &&
                  Object.keys(recipe.substitutions).length > 0 && (
                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-2 text-sm">
                        Substitutions Available:
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(recipe.substitutions).map(
                          ([ingredient, subs]) => (
                            <div key={ingredient} className="text-sm">
                              <span className="font-medium">{ingredient}:</span>{" "}
                              <span className="text-muted-foreground">
                                {subs.join(", ")}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Instructions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5" />
                  Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {instructions.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground leading-relaxed">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {recipe.created_by && (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">
                      Created by:{" "}
                      <span className="font-medium">{recipe.created_by}</span>
                    </p>
                  </CardContent>
                </Card>
              )}
              {recipe.created_at && (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">
                      Created:{" "}
                      <span className="font-medium">
                        {new Date(recipe.created_at).toLocaleDateString()}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
