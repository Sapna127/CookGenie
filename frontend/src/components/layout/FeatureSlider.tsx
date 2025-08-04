import { motion } from "framer-motion";
import {
  ChefHat,
  Sparkles,
  Archive,
  Wand2,
  Leaf,
  Save,
  Badge,
  Play,
} from "lucide-react";

const features = [
  {
    icon: <ChefHat size={28} />,
    title: "AI-Powered Recipes",
    description: "Suggestions based on your real kitchen ingredients.",
  },
  {
    icon: <Archive size={28} />,
    title: "Pantry Mode",
    description: "Generate recipes with just the ingredients you have.",
  },
  {
    icon: <Wand2 size={28} />,
    title: "Smart Parsing",
    description: "Understands '1 onion, some milk, 2 eggs' inputs easily.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Magical Substitutions",
    description: "Out of butter? Get AI-powered swaps instantly.",
  },
  {
    icon: <Save size={28} />,
    title: "Bookmark Recipes",
    description: "Save and revisit your delicious past creations.",
  },
  {
    icon: <Leaf size={28} />,
    title: "Waste-Free Cooking",
    description: "Use leftovers creatively. No ingredient left behind.",
  },
];

export default function FeatureSlider() {
  return (
    <section className="w-full px-6 py-24 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1 inline-flex items-center">
            <Play className="w-3 h-3 mr-1" />
            See It In Action
          </Badge> */}
          <h2 className="text-xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-orange-800 bg-clip-text text-transparent">
            Why CookGenie?
          </h2>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            A kitchen companion that’s creative, conscious, and completely AI-powered.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-800 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
