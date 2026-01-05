import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Clock, Users, Star, ChefHat } from 'lucide-react';
import type { DisplayRecipe } from '../../types/recipe';

interface RecipeCardProps {
  recipe: DisplayRecipe;
  onSelect?: (recipe: DisplayRecipe) => void;
}

const DIFFICULTY_COLORS = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  return (
    <Card className="recipe-card w-[300px] flex-shrink-0">
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge className={DIFFICULTY_COLORS[recipe.difficulty]}>
            {recipe.difficulty}
          </Badge>
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-background/90 rounded-full px-2 py-1">
          <Star className="w-3 h-3 fill-accent text-accent" />
          <span className="text-xs font-medium">{recipe.rating}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{recipe.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button 
          className="w-full" 
          onClick={() => onSelect?.(recipe)}
        >
          <ChefHat className="w-4 h-4 mr-2" />
          Start Cooking
        </Button>
      </CardContent>
    </Card>
  );
}