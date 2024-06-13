import express from 'express';
import commentController from '../controller/comment.controller.js';
import verifyToken from '../middleware/verifyToken.js';
const { createComment, getComments, likeComment, editComment, deleteComment } = commentController;

const router = express.Router();

router.post('/create', verifyToken, createComment)
router.get('/get-post-comments/:postId', getComments)
router.put('/likeComment/:commentId', verifyToken, likeComment)
router.put('/editComment/:commentId', verifyToken, editComment)
router.delete('/deleteComment/:commentId', verifyToken, deleteComment)

export default router