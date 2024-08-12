import React from 'react';
import { useRouter } from 'next/navigation';

const buttonLabels = ['mode of payment', 'checkout', 'void', 'delete', 'logout'];

interface OtherButtonsProps {
  onDeleteLastFood: () => void;
  onCheckout: () => void;
  onVoid: () => void;  // Add this line
  selectedFoods: { name: string; quantity: number; price: number }[];
  totalPrice: string;
  change: string;
}

const OtherButtons: React.FC<OtherButtonsProps> = ({ onDeleteLastFood, onCheckout, onVoid, selectedFoods, totalPrice, change }) => {
  const router = useRouter();

  const handleButtonClick = (label: string) => {
    if (label === 'delete') {
      onDeleteLastFood();
    } else if (label === 'checkout') {
      onCheckout();
    } else if (label === 'logout') {
      router.push('/home');
    } else if (label === 'mode of payment') {
      // Serialize data to a query string
      const queryString = new URLSearchParams({
        selectedFoods: JSON.stringify(selectedFoods),
        totalPrice,
        change,
      }).toString();

      router.push(`/pos/payment?${queryString}`);
    } else if (label === 'void') {
      onVoid();  // Call the void function
    }
  };

  return (
    <div className="flex md:flex-row gap-2">
      {buttonLabels.map((label, index) => (
        <div key={index}>
          <button
            className="bg-white py-5 px-10 rounded-2xl text-customGray"
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default OtherButtons;
