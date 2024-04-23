import express from "express";
import postController from "../controller/post.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const { createPost, getAllPosts, deletePost, updatePost } = postController;

const router = express.Router();

router.get('/', getAllPosts);
router.post('/create', verifyToken, createPost);
router.put('/update', verifyToken, updatePost)
router.delete('/:postId', verifyToken, deletePost)


export default router