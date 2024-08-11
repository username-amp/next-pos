import React from 'react';

interface DisplayAreaProps {
  selectedFoods: { name: string, quantity: number, price: number }[];
  totalPrice: string; // totalPrice should be a string as per your prop definition
  change: string; // Add this line to include the change
}

const DisplayArea: React.FC<DisplayAreaProps> = ({ selectedFoods, totalPrice, change }) => {
  return (
    <div className="bg-displayBack h-fit rounded-lg p-1 w-full">
      <div className="bg-inputColor h-8 mb-4 rounded"></div>
      <div className="bg-displayBack h-44 rounded border-b-4 border-white flex flex-col space-y-2 overflow-y-auto">
        {selectedFoods.length === 0 ? (
          <span className="text-white text-xs">Select an item</span>
        ) : (
          selectedFoods.map((food, index) => (
            <div key={index} className="text-white text-xs flex justify-between">
              <span>{food.quantity} x {food.name}</span>
              <span>₱{(food.price * food.quantity).toFixed(2)}</span>
            </div>
          ))
        )}
      </div>
      <div className="bg-displayBack p-2 text-white font-bold text-lg flex justify-between items-center mt-1">
        <span>Total:</span>
        <span>₱{totalPrice}</span>
      </div>
      <div className="bg-displayBack p-2 text-white font-bold text-lg flex justify-between items-center">
        <span>Change:</span>
        <span>₱{change}</span>
      </div>
    </div>
  );
};

export default DisplayArea;
