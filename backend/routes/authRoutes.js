
import express from 'express';
import { registerUser, loginUser } from "../controllers/authController.js"
const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/test', (req, res) => {
  console.log('Auth route test endpoint was hit');
    res.send('Auth route is working');
  });
  

export default authRouter;
