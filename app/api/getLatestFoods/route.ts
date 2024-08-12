import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Replace with your MongoDB connection string
const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const database = client.db('posSystem');
    const collection = database.collection('selectedFoods');

    // Fetch the latest inserted document
    const latestDocument = await collection.find().sort({ _id: -1 }).limit(1).toArray();

    // If no document is found, return empty data
    if (latestDocument.length === 0) {
      return NextResponse.json({
        selectedFoods: [],
        totalPrice: '0.00',
        change: '0.00',
        receiptNumber: null
      });
    }

    // Extract relevant fields from the document
    const { selectedFoods = [], totalAmount: totalPrice = 0, cashAmount: cash = 0, receiptNumber } = latestDocument[0];
    const change = (parseFloat(cash as any) - parseFloat(totalPrice as any)).toFixed(2);

    return NextResponse.json({
      selectedFoods,
      totalPrice: totalPrice.toFixed(2),
      change,
      receiptNumber: receiptNumber || null
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return NextResponse.json({
      selectedFoods: [],
      totalPrice: '0.00',
      change: '0.00',
      receiptNumber: null
    });
  } finally {
    await client.close();
  }
}
