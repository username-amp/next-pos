import React, { useState } from 'react';

const buttons = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['del', '0', 'checkout'],
];

interface NumberPadProps {
  onQuantityChange: (quantity: number) => void;
}

const NumberPad: React.FC<NumberPadProps> = ({ onQuantityChange }) => {
  const [quantity, setQuantity] = useState<string>('');

  const handleButtonClick = (button: string) => {
    if (button === 'del') {
      setQuantity(prev => {
        const newQuantity = prev.slice(0, -1);
        console.log('Current quantity after del:', newQuantity);
        return newQuantity;
      });
    } else if (button === 'checkout') {
      const quantityNumber = parseInt(quantity, 10) || 1;
      onQuantityChange(quantityNumber);
      console.log('Quantity checked out:', quantityNumber);
      setQuantity('');
    } else {
      setQuantity(prev => {
        const newQuantity = prev + button;
        console.log('Current quantity:', newQuantity);
        return newQuantity;
      });
    }
  };

  return (
    <div>
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className='flex gap-2 mt-2'>
          {row.map((button, buttonIndex) => (
            <button
              key={buttonIndex}
              className={`h-16 w-24 text-white font-extralight text-2xl rounded-2xl transition-transform duration-150 ease-in-out ${
                button === 'checkout' ? 'bg-white text-displayBack text-lg' :
                button === 'del' ? 'bg-white text-displayBack' :
                'bg-displayBack'
              } hover:scale-105 active:scale-95 hover:bg-gray-700 active:bg-gray-800`}
              onClick={() => handleButtonClick(button)}
            >
              {button}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NumberPad;
