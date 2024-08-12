// components/pos/PosPage.tsx

'use client'
import React, { useState } from "react";
import DisplayArea from "@/components/pos/DisplayArea";
import NumberPad from "@/components/pos/NumberPad";
import CashInputPad from "@/components/pos/CashInputPad";
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
  const [showCashPad, setShowCashPad] = useState<boolean>(false);
  const [cash, setCash] = useState<number>(0);
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null);

  const handleFoodSelect = (food: { name: string, price: number }) => {
    setSelectedFoods(prevFoods => [...prevFoods, { name: food.name, quantity, price: food.price }]);
    setQuantity(1);
  };

  const handleDeleteLastFood = () => {
    setSelectedFoods(prevFoods => prevFoods.slice(0, -1));
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleCashInput = async (cashAmount: number, receiptNumber: string) => {
    setCash(cashAmount);
    setShowCashPad(false); // Hide cash pad after confirmation
    setReceiptNumber(receiptNumber); // Set the receipt number

    // Store receipt number in localStorage for later use
    localStorage.setItem('receiptNumber', receiptNumber);
  };

  const handleVoid = () => {
    setSelectedFoods([]);
    setCash(0);
    setReceiptNumber(null);
    localStorage.removeItem('receiptNumber'); // Clear receipt number from localStorage
  };

  const calculateTotalPrice = () => {
    return selectedFoods.reduce((total, food) => total + food.price * food.quantity, 0).toFixed(2);
  };

  const calculateChange = () => {
    const totalAmount = parseFloat(calculateTotalPrice());
    return (cash >= totalAmount ? (cash - totalAmount).toFixed(2) : '0.00');
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
    <div className="bg-backColor h-screen">
      <div className="flex justify-between h-full">
        <div className="w-fit bg-backColor md:w-1/2">
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

        <div className="bg-inherit h-screen w-fit md:w-1/2 flex flex-col justify-between overflow-hidden">
          <div>
            <DisplayArea
              selectedFoods={selectedFoods}
              totalPrice={calculateTotalPrice()}
              change={calculateChange()}
            />
          </div>
          <div className="bg-inherit">
            <div className="w-full flex justify-end">
              <OtherButtons
                onDeleteLastFood={handleDeleteLastFood}
                onCheckout={() => setShowCashPad(true)}
                onVoid={handleVoid}  // Added onVoid handler
                selectedFoods={selectedFoods}
                totalPrice={calculateTotalPrice()}
                change={calculateChange()}
              />
            </div>
          </div>
          <div className="bg-inherit">
            <div className="justify-center w-full flex">
              {showCashPad ? (
                <CashInputPad
                  totalAmount={parseFloat(calculateTotalPrice())}
                  onCashInput={handleCashInput}
                  selectedFoods={selectedFoods}
                />
              ) : (
                <NumberPad onQuantityChange={handleQuantityChange} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosPage;
