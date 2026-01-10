import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Salad } from "lucide-react";
import Card from "@mui/material/Card";
import RecipeCard from "../components/recipe/RecipeCard";
import { getRandomMockRecipes } from "../data/mockDataService";
import { Link } from "react-router-dom";

type User = {
  name: string;
};

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const recipes = getRandomMockRecipes(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        /* 🔒 NOT LOGGED IN */
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-sm space-y-5">
            <h2 className="text-xl font-semibold text-gray-800">
              Save recipes, switch to pantry mode and much more 🍽️
            </h2>

            <Button
              className="w-full"
              onClick={() => {
                setIsLoggedIn(true);
                setUser({ name: "Sapna" });
              }}
            >
              Login / Sign up
            </Button>
          </div>
        </div>
      ) : (
        /* ✅ LOGGED IN */
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-sm text-gray-500">Hello, {user?.name} 👋</h2>
            <h1 className="text-2xl font-semibold text-gray-900">
              Your Recipes
            </h1>
          </div>

          {/* Recipes scroll */}
          <div
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* Pantry card */}
          <Card className="rounded-xl shadow-sm bg-amber-100">
            <div className="flex flex-col items-center justify-center p-10 gap-4 text-center">
              <Salad className="w-12 h-12 text-green-700" />

              <p className="text-lg font-medium text-gray-800">
                Go to your pantry
              </p>

              <Button asChild className="mt-2 w-[200px]">
                <Link to="/pantry">Pantry</Link>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;
