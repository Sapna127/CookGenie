import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

const navLinks = ["Home", "Recipes", "Pantry", "Profile"];

export default function CookGenieNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence mode="wait">
        {!menuOpen ? (
          // 🔥 Original pill design but enhanced
          <motion.div
            key="default"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-2"
          >
            {/* Main pill container */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center rounded-full bg-gradient-to-r from-[#FF5E62] to-[#FF9966] shadow-lg"
            >
              {/* Text portion */}
              <div className="px-6 py-3 text-white font-medium text-sm">
                Cook smarter, eat better — with <span className="font-bold">CookGenie</span>
              </div>
              
              {/* Menu button with creative divider */}
              <div className="relative h-full flex items-center">
                <div className="absolute left-0 w-px h-6 bg-white/30" />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMenuOpen(true)}
                  className="px-5 py-3 text-white text-sm font-medium flex items-center"
                >
                  MENU <ChevronRight className="ml-1 w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Optional floating action button */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white shadow-md text-[#FF5E62]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                <path d="M8.5 8.5v.01"></path>
                <path d="M16 15.5v.01"></path>
                <path d="M12 12v.01"></path>
                <path d="M11 17v.01"></path>
                <path d="M7 14v.01"></path>
              </svg>
            </motion.button>
          </motion.div>
        ) : (
          // 🍑 Expanded menu with personality
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Menu header */}
            <div className="bg-gradient-to-r from-[#FF5E62] to-[#FF9966] p-4 text-white flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </div>
                <span className="font-bold">CookGenie</span>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(false)}
                className="p-1 rounded-full hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Menu items */}
            <div className="p-4">
              {navLinks.map((link) => (
                <motion.div
                  key={link}
                  whileHover={{ x: 5 }}
                  onClick={() => {
                    setActive(link);
                    setMenuOpen(false);
                  }}
                  className={`py-3 px-4 rounded-lg cursor-pointer flex items-center ${
                    active === link ? 'bg-orange-50 text-[#FF5E62]' : 'hover:bg-gray-50'
                  }`}
                >
                  <ChevronRight className={`mr-2 w-4 h-4 ${
                    active === link ? 'opacity-100' : 'opacity-0'
                  }`} />
                  <span className="font-medium">{link}</span>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
              v1.0 · CookGenie
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}