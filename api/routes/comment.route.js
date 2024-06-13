import express from 'express';
import commentController from '../controller/comment.controller.js';
import verifyToken from '../middleware/verifyToken.js';
const { createComment, getComments, likeComment } = commentController;

const router = express.Router();

router.post('/create', verifyToken, createComment)
router.get('/get-post-comments/:postId', getComments)
router.put('/likeComment/:commentId', verifyToken, likeComment)

export default router