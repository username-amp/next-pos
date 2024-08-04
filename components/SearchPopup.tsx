import React from 'react';

interface SearchPopupProps {
  onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-backColor p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl mb-4 text-white">Search Receipt</h2>
        <input
          type="text"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter receipt number"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="py-1 px-4 bg-okButton text-white rounded hover:bg-gray-700 mt-3"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
