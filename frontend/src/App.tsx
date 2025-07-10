import { DemoSection } from "./components/recipe/DemoSection";
import { HeroSection } from "./components/layout/HeroSection";
import PizzaNav from "./components/layout/PizzaNav";

const App = () => {
  return (
    <>
      {/* <h1 className="text-3xl font-bold text-center text-green-700">
        🍳 CookGenie
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Smart recipe suggestions from your pantry.
      </p> */}
      {/* <PizzaNav /> */}
      <HeroSection />
      <DemoSection />
    </>
  );
};
export default App;
