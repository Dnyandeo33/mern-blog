import express from 'express';
import authController from '../controller/auth.controller.js';
const { signUp } = authController;

const router = express.Router();

router.post('/sing-up', signUp)

export default router;