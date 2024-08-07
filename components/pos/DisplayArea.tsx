import React from 'react';

interface DisplayAreaProps {
  selectedFoods: { name: string, quantity: number }[];
}

const DisplayArea: React.FC<DisplayAreaProps> = ({ selectedFoods }) => {
  return (
    <div className="bg-displayBack h-72 rounded-lg p-4 w-full">
      <div className="bg-inputColor h-8 mb-4 rounded"></div>
      <div className="bg-displayBack h-44 rounded border-b-4 border-white flex flex-col space-y-2 overflow-y-auto">
        {selectedFoods.length === 0 ? (
          <span className="text-white text-xs">Select an item</span>
        ) : (
          selectedFoods.map((food, index) => (
            <span key={index} className="text-white text-xs">
              {food.quantity} x {food.name}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayArea;
