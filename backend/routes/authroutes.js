import express from 'express';
import { login, register,loginAdmin } from '../controllers/authControllers.js';

const router = express.Router();


router.post('/login', login);
router.post('/register', register);
router.post('/adminLogin',loginAdmin)

export default router;
