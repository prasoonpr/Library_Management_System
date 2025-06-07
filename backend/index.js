import express from 'express';
import nocache from 'nocache';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import authRouter from './routes/authroutes.js';
import cors from 'cors';
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/userRoutes.js'
import { authenticateUser } from './middlewares/verifyToken.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true               // allow cookies and credentials
}));

app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/admin',authenticateUser,adminRouter)
app.use('/user',authenticateUser,userRouter)

async function server() {
  const DB = process.env.MONGO_URI;
  const PORT = process.env.PORT ;

  try {
    await connectDb(DB);
    app.listen(PORT, () => {
      console.log(`🚀 Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server start failed:', error);
  }
}

server();
