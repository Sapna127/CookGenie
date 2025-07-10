import { useState } from "react";
import { Home, User, PieChart, Settings, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  { icon: <Home size={20} />, href: "/", label: "Home" },
  { icon: <User size={20} />, href: "/profile", label: "Profile" },
  { icon: <PieChart size={20} />, href: "/stats", label: "Stats" },
  { icon: <Settings size={20} />, href: "/settings", label: "Settings" },
];

export default function PizzaNav() {
  const [isOpen, setIsOpen] = useState(false);
  const radius = 80;

  return (
    <div className="fixed bottom-10 left-10 z-50">
      {/* Center Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white flex items-center justify-center shadow-xl transition-all duration-300"
      >
        <UtensilsCrossed size={28} />
      </button>

      {/* Circular Menu Items */}
      {isOpen &&
        menuItems.map((item, index) => {
          const angle = (360 / menuItems.length) * index - 90; // offset by -90° so top = 0°
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 1, x, y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Link
                to={item.href}
                className="w-12 h-12 rounded-full bg-white text-yellow-600 hover:bg-yellow-100 flex items-center justify-center shadow-md transition-all"
                title={item.label}
              >
                {item.icon}
              </Link>
            </motion.div>
          );
        })}
    </div>
  );
}
