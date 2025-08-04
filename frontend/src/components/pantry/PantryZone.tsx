import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChefHat, X, Plus, Minus } from 'lucide-react';

interface PantryItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
}

interface PantryZoneProps {
  items: PantryItem[];
  onAddItem: (item: any) => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export default function PantryZone({ items, onAddItem, onRemoveItem, onUpdateQuantity }: PantryZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'pantry-zone',
  });

  const canMakeRecipes = items.length >= 3;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="w-5 h-5" />
          What's in my kitchen?
          {canMakeRecipes && (
            <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
              Ready to cook!
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={setNodeRef}
          className={`pantry-zone ${isOver ? 'active' : ''} ${items.length === 0 ? 'min-h-[120px]' : 'min-h-[80px]'}`}
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ChefHat className="w-8 h-8 mb-2 opacity-50" />
              <p>Drag ingredients here to see what you can cook!</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 bg-card border border-border rounded-lg p-3 shadow-sm"
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className="font-medium">{item.name}</span>
                  
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-6 h-6 p-0"
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    
                    <span className="min-w-[20px] text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-6 h-6 p-0"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-6 h-6 p-0 ml-2"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {canMakeRecipes && (
          <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded-lg">
            <p className="text-sm text-accent-foreground font-medium">
              🎉 Great! You can make some delicious recipes with these ingredients.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}