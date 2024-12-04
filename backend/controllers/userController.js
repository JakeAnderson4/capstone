import User from '../models/user.js'; 
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

/**
 * Fetches the authenticated user's profile.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
export const fetchAllUserProfiles = async (req, res) => {
  try {
    // Fetch all users excluding the sensitive `password_hash`
    const users = await User.findAll({
    });

    // If no users are found, return a 404 response
    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Return the list of users
    res.status(200).json(users);
  } catch (err) {
    console.error(`Error fetching user profiles: ${err.message}`);
    res.status(500).json({ error: 'Failed to retrieve user profiles' });
  }
};




export const fetchUserProfile = async (req, res) => {
  try {
    const { user_id: userId } = req.user; // Assume `authenticateToken` middleware sets `req.user`

    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password_hash'] }, // Sensitive data excluded
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error(`Error fetching user profile: ${err.message}`);
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};

/**
 * Modifies the authenticated user's profile.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
export const modifyUserProfile = async (req, res) => {
  try {
    const { user_id: userId } = req.user;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = {};
    const { name, email, password } = req.body;

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(12);
      updates.password_hash = await bcrypt.hash(password, salt);
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.update(updates);

    const updatedUser = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password_hash'] },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(`Error updating user profile: ${err.message}`);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};

/**
 * Removes the authenticated user's profile.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
export const removeUserProfile = async (req, res) => {
  try {
    const { user_id: userId } = req.user;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();

    res.status(200).json({ message: 'User profile successfully deleted' });
  } catch (err) {
    console.error(`Error deleting user profile: ${err.message}`);
    res.status(500).json({ error: 'Failed to delete user profile' });
  }
};
