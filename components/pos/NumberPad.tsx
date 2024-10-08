import React, { useState } from 'react';

const buttons = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['del', '0', 'confirm quantity'],
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
    } else if (button === 'confirm quantity') {
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
      <div className="bg-displayBack text-white text-md p-1 rounded-lg text-center w-full flex flex-col items-center overflow-hidden">
        {quantity || '0'}
      </div>
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className='flex gap-2 mt-2'>
          {row.map((button, buttonIndex) => (
           <button
           key={buttonIndex}
           className={`h-16 w-24 text-white font-extralight text-2xl rounded-2xl transition-transform duration-150 ease-in-out ${
             button === 'confirm quantity' ? 'text-black bg-black text-sm' :
             button === 'del' ? 'text-black bg-black' :
             'bg-displayBack'
           } hover:scale-105 active:scale-95 hover:bg-gray-700 active:bg-gray-800`}
           style={{ boxSizing: 'border-box' }}
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
