import express from 'express';
import commentController from '../controller/comment.controller.js';
import verifyToken from '../middleware/verifyToken.js';
const { createComment } = commentController;

const router = express.Router();

router.post('/create', verifyToken, createComment)

export default router