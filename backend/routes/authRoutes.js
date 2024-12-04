
import express from 'express';
import { registerUser, loginUser, updateUser, deleteUser } from "../controllers/authController.js"
const authRouter = express.Router();


authRouter.put('/:id', updateUser); // Add route for updating user by ID
authRouter.delete('/:id', deleteUser); // Add route for deleting user by ID
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/test', (req, res) => {
  console.log('Auth route test endpoint was hit');
    res.send('Auth route is working');
  });
  

export default authRouter;
