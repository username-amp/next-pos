'use client'
import React, { useEffect, useState } from 'react';
import Receipt from '@/components/Receipt';
import { useRouter } from 'next/navigation';

const PaymentPage = () => {
    const router = useRouter();
  const [data, setData] = useState<{ selectedFoods: any[]; totalPrice: string; change: string; receiptNumber: string | null } | null>(null);

  const handleBackClick = () => {
    router.back();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getLatestFoods');
        const result = await response.json();

        console.log('Fetched Data:', result);

        setData({
          selectedFoods: result.selectedFoods || [],
          totalPrice: result.totalPrice || '0.00',
          change: result.change || '0.00',
          receiptNumber: result.receiptNumber || null
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setData({
          selectedFoods: [],
          totalPrice: '0.00',
          change: '0.00',
          receiptNumber: null
        });
      }
    };

    fetchData();
  }, []);

  const printReceipt = () => {
    const receipt = document.getElementById('receipt');
    
    if (!receipt) {
      console.error("Receipt element not found.");
      return;
    }
    
    const newWindow = window.open('', '_blank', 'width=600,height=400');
  
    if (!newWindow) {
      console.error("Failed to open new window.");
      return;
    }
  
    newWindow.document.write(receipt.outerHTML);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();  
    newWindow.close();
  };
  

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-backColor h-screen p-4">
        <div>
        <button
            className="bg-displayBack text-white py-2 px-4 rounded"
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
      <h2 className="text-xl font-bold mb-4">Payment Page</h2>

      {/* Displaying the selected foods */}
      <div className="bg-displayBack h-fit rounded-lg p-1 w-full">
        <div className="bg-inputColor h-8 mb-4 rounded"></div>
        <div className="bg-displayBack h-44 rounded border-b-4 border-white flex flex-col space-y-2 overflow-y-auto">
          {data.selectedFoods.length === 0 ? (
            <span className="text-white text-xs">No items selected</span>
          ) : (
            data.selectedFoods.map((food, index) => (
              <div key={index} className="text-white text-xs flex justify-between">
                <span>{food.quantity} x {food.name}</span>
                <span>₱{(food.price * food.quantity).toFixed(2)}</span>
              </div>
            ))  
          )}
        </div>
        <div className="bg-displayBack p-2 text-white font-bold text-lg flex justify-between items-center mt-1">
          <span>Total:</span>
          <span>₱{data.totalPrice}</span>
        </div>
        <div className="bg-displayBack p-2 text-white font-bold text-lg flex justify-between items-center">
          <span>Change:</span>
          <span>₱{data.change}</span>
        </div>
        {data.receiptNumber && (
          <div className="bg-displayBack p-2 text-white font-bold text-lg flex justify-between items-center">
            <span>Receipt Number:</span>
            <span>{data.receiptNumber}</span>
          </div>
        )}
      </div>

      {/* Payment buttons */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Select Payment Method:</h3>
        <div className="flex gap-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={printReceipt}
          >
            Cash
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => console.log('Card payment selected')}
          >
            Card
          </button>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded"
            onClick={() => console.log('GCash payment selected')}
          >
            GCash
          </button>
          
        </div>
      </div>

      {/* Hidden Receipt component for printing */}
      <div style={{ display: 'none' }}>
        <Receipt data={data} />
      </div>
    </div>
  );
};

export default PaymentPage;
