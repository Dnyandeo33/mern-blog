import express from 'express';
import authController from '../controller/auth.controller.js';
const { signUp, signIn, google, signOut } = authController;

const router = express.Router();

// create authentication routes
router.post('/sing-up', signUp)
router.post('/sing-in', signIn)
router.post('/google', google)
router.post('/sing-out', signOut)

export default router;