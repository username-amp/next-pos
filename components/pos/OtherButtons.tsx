'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const buttonLabels = ['void', 'delete', 'logout'];

interface OtherButtonsProps {
  onDeleteLastFood: () => void;
}

const OtherButtons: React.FC<OtherButtonsProps> = ({ onDeleteLastFood }) => {
  const router = useRouter(); // Use router instead of Router

  const handleButtonClick = (label: string) => {
    if (label === 'delete') {
      onDeleteLastFood();
    } else if (label === 'logout') {
      router.push('/home'); // Correctly use router to navigate
    }
    // handle other button actions if needed
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
