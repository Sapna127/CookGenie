import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Clock, Users, ChefHat, Star, Play } from "lucide-react";

const sampleRecipes = [
  {
    id: 1,
    title: "Mediterranean Chicken Bowl",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    time: "25 min",
    servings: 4,
    difficulty: "Easy",
    tags: ["Healthy", "Protein-Rich"],
    rating: 4.8,
    ingredients: ["chicken", "quinoa", "tomatoes", "olives", "feta"]
  },
  {
    id: 2,
    title: "Creamy Mushroom Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
    time: "20 min",
    servings: 2,
    difficulty: "Easy",
    tags: ["Vegetarian", "Comfort Food"],
    rating: 4.7,
    ingredients: ["pasta", "mushrooms", "cream", "garlic", "parmesan"]
  },
  {
    id: 3,
    title: "Asian Stir-Fry Delight",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    time: "15 min",
    servings: 3,
    difficulty: "Medium",
    tags: ["Quick", "Asian Fusion"],
    rating: 4.9,
    ingredients: ["vegetables", "soy sauce", "ginger", "rice", "sesame oil"]
  }
];

export const DemoSection = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(sampleRecipes[0]);

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
            <Play className="w-3 h-3 mr-1" />
            See It In Action
          </Badge>
          <h2 className="text-xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-orange-800 bg-clip-text text-transparent">
            AI-Generated Recipe Magic
          </h2>
          <p className="text-l text-gray-600 max-w-3xl mx-auto">
            Watch how our AI transforms simple ingredients into amazing recipes with smart suggestions and cooking guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sampleRecipes.map((recipe) => (
                <Card 
                  key={recipe.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    selectedRecipe.id === recipe.id ? 'ring-2 ring-orange-400 shadow-lg' : ''
                  }`}
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <div className="relative">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                      <span className="text-xs font-medium">{recipe.rating}</span>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {recipe.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {recipe.time}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {recipe.servings}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recipe.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recipe Details */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-white/90 backdrop-blur-sm border-orange-100">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                  <ChefHat className="w-5 h-5 mr-2 text-orange-600" />
                  Recipe Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Ingredients Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecipe.ingredients.map((ingredient) => (
                        <Badge key={ingredient} className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Smart Features:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Substitution suggestions available
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        Step-by-step cooking mode
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                        Nutritional information included
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                        Cooking tips & tricks
                      </li>
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    View Full Recipe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
