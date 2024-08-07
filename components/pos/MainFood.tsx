import React from 'react';

const buttonRows = [
  ['SilogProduct', 'Sizzling', 'FamilyMeals'],
  ['Unli', 'Noodles'],
  ['Sandwiches', 'Beverage', 'Desserts'],
  ['Extra'],
];

interface MainFoodProps {
  onFoodSelect: (food: string) => void;
}

const MainFood: React.FC<MainFoodProps> = ({ onFoodSelect }) => {
  return (
    <div>
      {buttonRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-1 ${rowIndex % 2 === 1 ? 'justify-end' : ''}`}
        >
          {row.map((button, buttonIndex) => (
            <button
              key={buttonIndex}
              className={`py-5 px-10 rounded-2xl ${
                rowIndex % 2 === 1 ? 'bg-white text-black' : 'bg-customGray text-white'
              }`}
              onClick={() => onFoodSelect(button)}
            >
              {button}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MainFood;
