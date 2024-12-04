import express from 'express';
import { modifyUserProfile, removeUserProfile, fetchAllUserProfiles} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/getallusers', fetchAllUserProfiles);
userRouter.put('/:id', modifyUserProfile);
userRouter.delete('/:id', removeUserProfile);

export default userRouter;
