import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-backColor text-white">
      <div className="w-1/2 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl mb-6 text-center font-serif">Settings</h1>

        {/* Business Information */}
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Business Information</h2>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Business Name</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter business name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Address</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Contact Details</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact details"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Business Hours</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter business hours"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Upload Logo</label>
            <input
              type="file"
              className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Language Selection */}
        <div>
          <h2 className="text-2xl mb-4">Language</h2>
          <div>
            <label className="block text-gray-400 mb-2">Select Default Language</label>
            <select className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
