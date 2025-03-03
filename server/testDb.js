import pool from './config/database.js';

async function testDatabaseConnection() {
  try {
    // Test query
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Database connection successful!');
    console.log('Test query result:', rows[0].result);

    // Test users table
    const [users] = await pool.query('SELECT COUNT(*) as count FROM users');
    console.log('Number of users in database:', users[0].count);

  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testDatabaseConnection();