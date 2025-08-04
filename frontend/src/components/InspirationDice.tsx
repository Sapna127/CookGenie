import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Dice6, Sparkles } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface InspirationDiceProps {
  onRandomRecipe?: () => void;
}

export default function InspirationDice({ onRandomRecipe }: InspirationDiceProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setIsSpinning(true);
    
    setTimeout(() => {
      setIsSpinning(false);
      onRandomRecipe?.();
      
      toast({
        title: "✨ Recipe Inspiration!",
        description: "Here's a random recipe suggestion just for you!",
      });
    }, 1500);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isSpinning}
      className={`dice-button ${isSpinning ? 'animate-bounce' : ''}`}
      style={{
        animation: isSpinning ? 'glow 1.5s infinite' : undefined,
      }}
    >
      {isSpinning ? (
        <Sparkles className="w-6 h-6 animate-spin" />
      ) : (
        <Dice6 className="w-6 h-6" />
      )}
    </Button>
  );
}