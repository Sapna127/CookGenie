import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface AnimatedButtonProps {
  onClick: () => void;
  isAnimating: boolean;
}

const GenerateButton = ({ onClick, isAnimating }: AnimatedButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      disabled={isAnimating}
      onHoverStart={() => setIsActive(true)}
      onHoverEnd={() => setIsActive(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center gap-2 px-8 h-12 rounded-lg overflow-hidden ${
        isAnimating ? "animate-pulse" : ""
      } bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white`}
    >
      {/* Dots border animation - only visible on hover */}
      {isActive && !isAnimating && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 w-[calc(100%+4px)] h-[calc(100%+4px)] bg-transparent"
            style={{
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              rotate: 360,
              transition: { duration: 2, repeat: Infinity, ease: "linear" },
            }}
          >
            <div className="absolute top-1/2 left-1/2 w-full h-8 bg-white/30 mask-gradient-to-b from-transparent to-white" />
          </motion.div>
        </motion.div>
      )}

      {/* Sparkle icon with conditional animation */}
      {isAnimating ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
      ) : (
        <motion.div
          animate={{
            scale: isActive ? [1, 1.2, 1] : 1,
            transition: { duration: 0.5 },
          }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
      )}

      {/* Text with gradient effect */}
      <motion.span
        className={`relative ${
          isActive ? "bg-gradient-to-r from-white to-white/90" : "bg-white"
        } bg-clip-text text-transparent`}
      >
        Generate Recipe
      </motion.span>

      {/* Purple glow effect on hover */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          style={{
            boxShadow: "0 0 0 6px hsl(260 97% 50% / 0.75)",
          }}
        />
      )}
    </motion.button>
  );
};

export default GenerateButton;