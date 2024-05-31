import express from 'express';
import commentController from '../controller/comment.controller.js';
import verifyToken from '../middleware/verifyToken.js';
const { createComment, getComments } = commentController;

const router = express.Router();

router.post('/create', verifyToken, createComment)
router.get('/get-post-comments/:postId', getComments)

export default router