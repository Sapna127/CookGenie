import { Button } from "../components/ui/button";
import { Salad } from "lucide-react";
import Card from "@mui/material/Card";
import RecipeCard from "../components/recipe/RecipeCard";
import { getRandomMockRecipes } from "../data/mockDataService";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect } from "react";
import { userAPI } from "../lib/api";

const Profile = () => {
  const { user } = useUser();
  const recipes = getRandomMockRecipes(3);

  // 🔥 Create user in backend if not exists
  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        await userAPI.createUser({
          clerk_id: user.id,
         username: user.fullName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
        });
      } catch (err) {
        // Ignore if already exists
        console.log("User already exists or error", err);
      }
    };

    syncUser();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔒 NOT LOGGED IN */}
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-sm space-y-5">
            <h2 className="text-xl font-semibold text-gray-800">
              Save recipes, switch to pantry mode and much more 🍽️
            </h2>

            <SignInButton mode="modal">
              <Button className="w-full">Login / Sign up</Button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      {/* ✅ LOGGED IN */}
      <SignedIn>
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* Header */}
          <div className="space-y-1 flex justify-between items-center">
            <div>
              <h2 className="text-sm text-gray-500">
                Hello, {user?.firstName} 👋
              </h2>
              <h1 className="text-2xl font-semibold text-gray-900">
                Your Recipes
              </h1>
            </div>

            <UserButton />
          </div>

          {/* Recipes */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* Pantry */}
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
      </SignedIn>
    </div>
  );
};

export default Profile;
