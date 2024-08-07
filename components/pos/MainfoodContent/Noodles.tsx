import React from 'react'
const buttonRows = [
    ['Butao King', 'Red King', 'Green King'],
    ['Gyoza', 'Black King', 'Wonder Chashu King'],
  ];

  interface UnliProps {
    onFoodSelect: (food: string) => void;
  }
  
  const Noodles: React.FC<UnliProps> = ({ onFoodSelect }) => {
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
};

export default Noodles