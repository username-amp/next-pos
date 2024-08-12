import React from 'react';

interface Food {
  name: string;
  price: number;
  quantity: number;
}

interface ReceiptProps {
  data: {
    selectedFoods: Food[];
    totalPrice: string;
    change: string;
    receiptNumber: string | null;
  };
}

const Receipt: React.FC<ReceiptProps> = ({ data }) => {
  return (
    <div className="p-4 text-black text-center" id="receipt">
      <h2 className="text-xl font-bold text-center mb-4">Official Receipt</h2>
      <div className="mb-2">
        <h3 className="font-semibold">Purchased Items:</h3>
        <ul>
          {data.selectedFoods.map((food, index) => (
            <li key={index} className="flex justify-between">
              <span>{food.quantity} x {food.name}</span>
              <span>₱{(food.price * food.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>₱{data.totalPrice}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Change:</span>
        <span>₱{data.change}</span>
      </div>
      {data.receiptNumber && (
        <div className="flex justify-between font-bold">
          <span>Receipt Number:</span>
          <span>{data.receiptNumber}</span>
        </div>
      )}
    </div>
  );
};

export default Receipt;
