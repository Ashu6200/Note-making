import express from 'express';
import { signUp, verifyOtp } from '../controllers/userController';


const userRouter = express.Router();

userRouter.post('/signup', signUp)
userRouter.post('/verify', verifyOtp)

export default userRouter