import express from "express";
import postController from "../controller/post.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const { createPost, getAllPosts, deletePost, updatePost } = postController;

const router = express.Router();

router.get('/get-posts', getAllPosts);
router.post('/create', verifyToken, createPost);
router.put('/update-post', verifyToken, updatePost)
router.delete('/delete-post/:postId/:userId', verifyToken, deletePost)


export default router