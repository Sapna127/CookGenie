import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Sparkles, ArrowDown } from "lucide-react";
import GenerateButton from "./GenerateButton";
import Navbar from "./Navbar";

export const HeroSection = () => {
  const [ingredients, setIngredients] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGenerateRecipe = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/30 to-yellow-100/50"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200 rounded-full blur-xl animate-pulse delay-1000"></div>
     <Navbar />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Cooking Assistant
          </Badge> */}

          <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-800 to-amber-700 bg-clip-text text-transparent leading-tight">
            🍳 CookGenie
          </h1>

          <p className="text-xl md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Tell us what's in your kitchen, and our AI will create personalized
            recipes with smart substitutions and step-by-step cooking guidance.
          </p>
        </div>

        {/* Ingredient Input Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              What's in your kitchen today?
            </h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="e.g., chicken, tomatoes, garlic, rice..."
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="flex-1 h-12 text-lg border-orange-200 focus:border-orange-400 focus:ring-orange-400"
              />
              <Button
                onClick={handleGenerateRecipe}
                size="lg"
                className={`bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-8 h-12 ${
                  isAnimating ? "animate-pulse" : ""
                }`}
              >
                {isAnimating ? (
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 mr-2" />
                )}
                Generate Recipe
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Quick Pasta",
                "Chicken Stir-fry",
                "Veggie Soup",
                "Breakfast Bowl",
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setIngredients(suggestion.toLowerCase())}
                  className="text-orange-700 border-orange-200 hover:bg-orange-50"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
