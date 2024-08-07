import React from "react";

const buttonRows = [
  ['SisigSilog', 'TapaSilog', 'SpamSilog'],
  ['LechonKawali', 'ChickenSilog', 'HotdogSilog'],
  ['LiempoSilog', 'CornBeefSilog', 'PorkSilog'],
  ['SiomaiSilog'],
];


interface UnliProps {
  onFoodSelect: (food: string) => void;
}

const SilogProducts: React.FC<UnliProps> = ({ onFoodSelect }) => {
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
  
  export default SilogProducts;
  