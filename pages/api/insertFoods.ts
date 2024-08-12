import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating receipt numbers

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('MONGODB_URI is not defined');
}

const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await client.connect();
      const db = client.db('posSystem');
      const collection = db.collection('selectedFoods');
      
      const { selectedFoods, totalAmount, cashAmount } = req.body;

      if (!Array.isArray(selectedFoods) || typeof totalAmount !== 'number' || typeof cashAmount !== 'number') {
        return res.status(400).json({ error: 'Invalid request data' });
      }

      // Generate a unique receipt number
      const receiptNumber = uuidv4();

      // Insert the data into MongoDB
      await collection.insertOne({
        receiptNumber, // Add receipt number to the document
        selectedFoods,
        totalAmount,
        cashAmount,
        createdAt: new Date(),
      });

      res.status(200).json({ message: 'Data inserted successfully', receiptNumber }); // Return receipt number in the response
    } catch (error) {
      console.error('Failed to insert data:', error); // Enhanced error logging
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
