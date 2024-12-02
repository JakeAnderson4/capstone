import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/user.js';

// Validation middleware for registration
export const validateRegister = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Register a new user
export const registerUser = async (req, res) => {
  try {
    console.log('Register Request Body:', req.body); // Log the request body
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error in registerUser:', error); // Log any errors
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Login an existing user
export const loginUser = async (req, res) => {
  try {
      console.log("Login Request Body:", req.body);

      const { email, password } = req.body;

      if (!email || !password) {
          console.error("Missing email or password");
          return res.status(400).json({ error: "Email and password are required" });
      }

      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
          console.error("User not found");
          return res.status(404).json({ error: "User not found" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          console.error("Invalid credentials");
          return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate a JWT
      const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, { expiresIn: "1h" });
      console.log("JWT Token Generated:", token);

      res.status(200).json({ message: "Login successful", token });
  } catch (error) {
      console.error("Error logging in:", error.message);
      res.status(500).json({ error: "Error logging in" });
  }
};

// Export the functions
export default { registerUser, loginUser, validateRegister };
