import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js'; // Adjust path if needed
import { register } from '../controllers/authController.js'; 
import { verifyToken } from '../utils/jwt.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Authentication routes
router.post('/login', async (req, res) => {
  const { email, password } = req.body;  // Changed aadhar_number to email

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });  // Updated message
  }

  try {
    // Query to check user credentials using email
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',  // Changed to email
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },  // Changed to email
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Optional: Set token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400000 // 1 day
    });

    // Remove password from user object before sending it
    delete user.password;

    res.json({ 
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }  // Changed to email
    });
    
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/register', register);

// Protected routes
router.get('/verify', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// Admin routes
router.get('/admin/verify', verifyToken, adminAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
