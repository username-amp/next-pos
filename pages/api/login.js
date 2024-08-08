import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const uri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const client = await clientPromise;
            const db = client.db();

            const user = await db.collection('users').findOne({ username });

            if (user && user.password === password) {
                const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '1d' });
                res.setHeader('Set-Cookie', serialize('token', token, {
                    path: '/',
                    httpOnly: true,
                    maxAge: 86400,
                    secure: process.env.NODE_ENV === 'production', // Only secure cookies in production
                }));
                res.status(200).json({ message: 'Login success' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
