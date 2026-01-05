import { NavLink } from "react-router-dom";
import { ChefHat, Soup, Refrigerator, User } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: ChefHat },
  { to: "/recipes", label: "Recipes", icon: Soup },
  { to: "/pantry", label: "Pantry", icon: Refrigerator },
  { to: "/profile", label: "Profile", icon: User }, // optional, can remove
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 rounded-full bg-white/80 px-2 py-1 shadow-sm border border-orange-100">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-orange-800/80 hover:bg-orange-100 hover:text-orange-900",
                ].join(" ")
              }
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden border-t border-orange-100 bg-white/95 backdrop-blur-sm">
        <div className="flex justify-around py-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-xs font-medium",
                  isActive
                    ? "text-orange-600"
                    : "text-orange-800/70 hover:text-orange-900",
                ].join(" ")
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
