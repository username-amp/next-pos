import React from 'react'
const buttonRows = [
    ['Coke', 'Pepsi', 'Sprite'],
    ['Water', 'Juice', 'Smoothie'],
    ['Tea', 'Coffee', 'Hot Chocolate'],
    ['Smoothie', 'Fruit Smoothie', 'Yogurt Smoothie'],
    ['Milkshake', 'Berry Smoothie', 'Grape Smoothie'],
    ['Chocolate Milkshake', 'Vanilla Milkshake', 'Strawberry Milkshake'],
    ['Hot Chocolate', 'Caramel', 'Rocky Road'],
    ['Rocky Road', 'Peppermint', 'Mint Chocolate Chip'],
    ['Rocky Road', 'Rocky Road', 'Rocky Road']
  ]

  interface UnliProps {
    onFoodSelect: (food: string) => void;
  }
  
  const Beverage: React.FC<UnliProps> = ({ onFoodSelect }) => {
    return (
        <div>
            {buttonRows.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex gap-1"
                >
                    {row.map((button, buttonIndex) => (
                        <button
                            key={buttonIndex}
                            className="mb-1 py-5 px-10 rounded-2xl bg-white text-black"
                            onClick={() => onFoodSelect(button)}
                        >
                            {button}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Beverage