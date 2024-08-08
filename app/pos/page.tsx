'use client';
import { useState } from "react";
import DisplayArea from "@/components/pos/DisplayArea";
import NumberPad from "@/components/pos/NumberPad";
import MainFood from "@/components/pos/MainFood";
import OtherButtons from "@/components/pos/OtherButtons";
import SilogProducts from "@/components/pos/MainfoodContent/SilogProducts";
import Sizzling from "@/components/pos/MainfoodContent/Sizzling";
import FamilyMeals from "@/components/pos/MainfoodContent/FamilyMeals";
import Unli from "@/components/pos/MainfoodContent/Unli";
import Noodles from "@/components/pos/MainfoodContent/Noodles";
import Sandwiches from "@/components/pos/MainfoodContent/Sandwiches";
import Beverage from "@/components/pos/MainfoodContent/Beverage";
import Desserts from "@/components/pos/MainfoodContent/Desserts";
import Extra from "@/components/pos/MainfoodContent/Extra";

const PosPage: React.FC = () => {
  const [selectedFoods, setSelectedFoods] = useState<{ name: string, quantity: number, price: number }[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleFoodSelect = (food: { name: string, price: number }) => {
    console.log('Selected food:', food.name);
    console.log('Quantity:', quantity);

    setSelectedFoods(prevFoods => [...prevFoods, { name: food.name, quantity, price: food.price }]);
    setQuantity(1);
  };

  const handleDeleteLastFood = () => {
    setSelectedFoods(prevFoods => prevFoods.slice(0, -1));
  };

  const handleQuantityChange = (newQuantity: number) => {
    console.log('Quantity changed to:', newQuantity);
    setQuantity(newQuantity);
  };

  const calculateTotalPrice = () => {
    return selectedFoods.reduce((total, food) => total + food.price * food.quantity, 0).toFixed(2);
  };

  const renderSelectedFoodComponent = () => {
    switch (currentCategory) {
      case 'SilogProduct':
        return <SilogProducts onFoodSelect={handleFoodSelect} />;
      case 'Sizzling':
        return <Sizzling onFoodSelect={handleFoodSelect} />;
      case 'FamilyMeals':
        return <FamilyMeals onFoodSelect={handleFoodSelect} />;
      case 'Unli':
        return <Unli onFoodSelect={handleFoodSelect} />;
      case 'Noodles':
        return <Noodles onFoodSelect={handleFoodSelect} />;
      case 'Sandwiches':
        return <Sandwiches onFoodSelect={handleFoodSelect} />;
      case 'Beverage':
        return <Beverage onFoodSelect={handleFoodSelect} />;
      case 'Desserts':
        return <Desserts onFoodSelect={handleFoodSelect} />;
      case 'Extra':
        return <Extra onFoodSelect={handleFoodSelect} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-backColor p-4 relative overflow-x-hidden">
      <div className="flex-1 flex flex-col space-y-4  relative overflow-x-hidden">
        <div className="absolute bottom-0 md:top-0 md:left-0 w-full md:w-auto">
          {currentCategory === null ? (
            <MainFood onFoodSelect={setCurrentCategory} />
          ) : (
            <div>
              <button
                className="mb-4 py-2 px-4 bg-white rounded-xl text-black"
                onClick={() => setCurrentCategory(null)}
              >
                Back to Main Menu
              </button>
              {renderSelectedFoodComponent()}
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="flex absolute w-full top-0 right-0 md:w-1/2">
            <DisplayArea selectedFoods={selectedFoods} totalPrice={calculateTotalPrice()} />
          </div>
          <div className="absolute right-0 top-[43%] md:top-[43%] md:right-0">
            <div className="flex flex-row gap-2 md:flex-col">
              <OtherButtons onDeleteLastFood={handleDeleteLastFood} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col space-y-4 absolute bottom-0 left-[57%] md:bottom-3 md:left-[64%]">
          <NumberPad onQuantityChange={handleQuantityChange} />
        </div>
      </div>
    </div>
  );
};

export default PosPage;