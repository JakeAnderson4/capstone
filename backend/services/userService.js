import express from 'express';
import { fetchUserProfile, modifyUserProfile, removeUserProfile } from './controllers/userController.js';
import { authenticateToken } from './middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticateToken, fetchUserProfile);
router.put('/profile', authenticateToken, modifyUserProfile);
router.delete('/profile', authenticateToken, removeUserProfile);

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password_hash: passwordHash });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate a token (JWT recommended)
    const token = jwt.sign({ user_id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;
