import express from 'express';
import nocache from 'nocache';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import authRouter from './routes/authroutes.js';

dotenv.config();

const app = express();

app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

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
