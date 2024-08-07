import React from 'react'
const buttonRows = [
    ['Spicy Tuna', 'Veggie', 'Salami'],
    ['Bacon', 'Chicken', 'Ham'],
    ['Pepperoni', 'Mushroom', 'Onion',],
    ['Hot Dog', 'Sausage', 'Club Sandwich',],
    ['Italian Bread', 'Grilled Cheese', 'Stuffed Bell Peppers',],
    ['French Bread', 'Garlic Bread', 'Sourdough',],
]
interface UnliProps {
    onFoodSelect: (food: string) => void;
  }
  
  const Sandwiches: React.FC<UnliProps> = ({ onFoodSelect }) => {
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

export default Sandwiches