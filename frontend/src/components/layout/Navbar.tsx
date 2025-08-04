import React, { useState } from "react";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

const Navbar = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGenerateRecipe = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };
  return (
    
    <div className="flex justify-between items-center p-4 bg-amber-50">
      <div>
        <h1 className="text-lg "> 🍳 CookGenie</h1>
      </div>
      <div className="bg-orange-300  rounded-xl p-1 pl-5 pr-5 w-[500px] flex justify-between items-center">
        <button className=" hover:text-orange-500 hover:bg-orange-100 rounded-lg p-2 cursor-pointer">Home</button>
        <button className="hover:text-orange-500 hover:bg-orange-100 rounded-lg p-2 cursor-pointer">Recipies</button>
        <button className="hover:text-orange-500 hover:bg-orange-100 rounded-lg p-2 cursor-pointer">Pantry</button>
        <button className="hover:text-orange-500 hover:bg-orange-100 rounded-lg p-2 cursor-pointer">Profile</button>
      </div>
      <div>
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
          Start Cooking
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
