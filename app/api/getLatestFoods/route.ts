import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// Replace with your MongoDB connection string
const uri = process.env.MONGODB_URI as string;
let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db('posSystem');
}

export async function GET() {
  try {
    const database = await connectToDatabase();
    const collection = database.collection('selectedFoods');

    // Fetch the latest inserted document
    const latestDocument = await collection.find().sort({ _id: -1 }).limit(1).toArray();

    if (latestDocument.length === 0) {
      return NextResponse.json({
        selectedFoods: [],
        totalPrice: '0.00',
        change: '0.00',
        receiptNumber: null
      });
    }

    // Extract relevant fields from the document
    const { selectedFoods = [], totalAmount: totalPrice = '0.00', cashAmount: cash = '0.00', receiptNumber } = latestDocument[0];

    const change = (parseFloat(cash) - parseFloat(totalPrice)).toFixed(2);

    return NextResponse.json({
      selectedFoods,
      totalPrice: parseFloat(totalPrice).toFixed(2),
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
    if (client) {
      await client.close();
      client = null;
    }
  }
}
