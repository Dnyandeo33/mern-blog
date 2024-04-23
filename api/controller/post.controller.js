import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

const postController = {
    getAllPosts: async (req, res, next) => {
        const posts = await Post.find({});
        res.status(200).json({ success: true, posts: posts });

    },
    createPost: async (req, res, next) => {
        if (!req.user.isAdmin) return next(errorHandler(403, 'Not allow to create post'));
        if (!req.body.title || !req.body.content) return next(errorHandler(400, 'Provide all the fields..'));

        try {
            const slug = req.body.title.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '');

            const newPost = new Post({
                userId: req.user.id,
                ...req.body,
                slug
            });

            const savedPost = await newPost.save();
            res.status(200).json({ success: true, post: savedPost })

        } catch (error) {
            next(errorHandler(error))
        }
    },

    deletePost: async (req, res, next) => {
        const { postId } = req.params
        const { isAdmin } = req.user
        if (!isAdmin) return next(errorHandler(403, 'Not allow to delete post'));
        try {
            const deletePost = await Post.findByIdAndDelete({ _id: postId });
            res.status(200).json({ success: true, message: "Post has been deleted successfully..." })
        } catch (error) {
            next(errorHandler(error))
        }
    },

    updatePost: async (req, res, next) => {


    }
}

export default postController