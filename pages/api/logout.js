import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Clear the token cookie
    res.setHeader('Set-Cookie', serialize('token', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0), // Expire the cookie
      secure: process.env.NODE_ENV === 'production', // Only secure cookies in production
    }));
    
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
