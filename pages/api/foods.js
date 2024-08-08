import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { category } = req.query;

  res.setHeader('Cache-Control', 'no-store');

  try {
    const client = await clientPromise;
    const db = client.db('posSystem');
    const collection = db.collection('menuItems');

    const foods = await collection.find({ category }).toArray();

    res.status(200).json(foods);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
