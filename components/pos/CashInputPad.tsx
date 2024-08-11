import React, { useState } from 'react';

interface CashInputPadProps {
  totalAmount: number;
  onCashInput: (cash: number) => void;
}

const CashInputPad: React.FC<CashInputPadProps> = ({ totalAmount, onCashInput }) => {
  const [cash, setCash] = useState<string>('');

  const handleButtonClick = (button: string) => {
    if (button === 'del') {
      setCash(prev => prev.slice(0, -1));
    } else if (button === 'confirm') {
      const cashAmount = parseFloat(cash) || 0;
      onCashInput(cashAmount);
      setCash('');
    } else {
      setCash(prev => prev + button);
    }
  };

  const buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['del', '0', 'confirm'],
  ];

  const cashAmount = parseFloat(cash) || 0;
  const change = cashAmount - totalAmount;

  return (
    <div>
      <div className="bg-displayBack text-white text-md p-1 rounded-lg text-center w-full">
        ${cash || '0'}
      </div>
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className='flex gap-2 mt-2'>
          {row.map((button, buttonIndex) => (
            <button
              key={buttonIndex}
              className={`h-16 w-24 text-white font-extralight text-2xl rounded-2xl transition-transform duration-150 ease-in-out ${
                button === 'confirm' ? 'text-black bg-black text-lg' :
                button === 'del' ? 'text-black bg-black' :
                'bg-displayBack'
              } hover:scale-105 active:scale-95 hover:bg-gray-700 active:bg-gray-800`}
              onClick={() => handleButtonClick(button)}
            >
              {button}
            </button>
          ))}
        </div>
      ))}
      {/*<div className="text-white text-lg mt-4">
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        <p>Change: ${(change >= 0 ? change : 0).toFixed(2)}</p>
      </div>*/}
    </div>
  );
};

export default CashInputPad;
