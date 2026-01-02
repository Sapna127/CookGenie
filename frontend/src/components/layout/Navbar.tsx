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
        <button className=" hover:text-orange-500 hover:bg-orange-100 rounded-lg p-2 cursor-pointer">
          Home
        </button>
        <button className="hover:text-orange-500 hover:bg-orange-100 rounded-lg p-2 cursor-pointer">
          Recipies
        </button>
        <button className="hover:text-orange-500 hover:bg-orange-100 rounded-lg p-2 cursor-pointer">
          Pantry
        </button>
        <button className="hover:text-orange-500 hover:bg-orange-100 rounded-lg p-2 cursor-pointer">
          Profile
        </button>
      </div>
    </div>
  );
};

export default Navbar;
