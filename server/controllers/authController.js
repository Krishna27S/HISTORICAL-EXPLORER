import bcrypt from 'bcryptjs';
import pool from '../config/database.js';
import { generateToken } from '../utils/jwt.js';

export const login = async (req, res) => {
  try {
    const { aadhar_number, password } = req.body;

    // Find user
    const [users] = await pool.query(
      'SELECT * FROM users WHERE aadhar_number = ?',
      [aadhar_number]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Update last login time
    await pool.query(
      'UPDATE users SET last_login = ? WHERE id = ?',
      [new Date(), user.id]
    );

    // Log login activity
    await pool.query(
      'INSERT INTO user_activity_logs (user_id, activity_type, details, ip_address) VALUES (?, ?, ?, ?)',
      [
        user.id,
        'login',
        JSON.stringify({
          timestamp: new Date(),
          userAgent: req.headers['user-agent']
        }),
        req.ip
      ]
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        aadhar_number: user.aadhar_number
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, aadhar_number } = req.body;

    // Validate Aadhar number
    if (!/^\d{12}$/.test(aadhar_number)) {
      return res.status(400).json({
        message: 'Invalid Aadhar number format'
      });
    }

    // Check if user exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR aadhar_number = ?',
      [email, aadhar_number]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        message: 'User already exists with this email or Aadhar number'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, aadhar_number) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, aadhar_number]
    );

    // Generate token
    const token = generateToken({
      id: result.insertId,
      role: 'user',
      aadhar_number
    });

    res.status(201).json({
      token,
      user: {
        id: result.insertId,
        username,
        email,
        role: 'user',
        aadhar_number
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};