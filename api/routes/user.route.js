import express from 'express';
import userController from '../controller/user.controller.js';
const { getUser } = userController;

const router = express.Router();

router.get('/', getUser);

export default router;