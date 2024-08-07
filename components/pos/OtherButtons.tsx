import React from 'react';

const buttonLabels = ['void', 'delete', 'logout'];

interface OtherButtonsProps {
  onDeleteLastFood: () => void;
}

const OtherButtons: React.FC<OtherButtonsProps> = ({ onDeleteLastFood }) => {
  const handleButtonClick = (label: string) => {
    if (label === 'delete') {
      onDeleteLastFood();
    }
    // handle other button actions if needed
  };

  return (
    <div className="flex flex-row md:flex-col gap-2">
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
