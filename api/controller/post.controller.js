import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

const postController = {
    getAllPosts: async (req, res, next) => {

        try {
            const startIndex = parseInt(req.query.startIndex) || 0;
            const limit = parseInt(req.query.limit) || 9;
            const sortDirection = req.query.order === 'dsc' ? 1 : -1;

            const posts = await Post.find({
                // search using query
                ...(req.query.userId && { userId: req.query.userId }),
                ...(req.query.category && { category: req.query.category }),
                ...(req.query.slug && { slug: req.query.slug }),
                ...(req.query.postId && { postId: req.query.postId }),

                // search using regex
                ...(req.query.searchTerm && {
                    $or: [
                        { title: { $regex: req.query.searchTerm, $options: 'i' } },
                        { content: { $regex: req.query.searchTerm, $options: 'i' } },
                    ]
                }),
            }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

            // total
            const total = await Post.countDocuments()

            // last one month post
            const now = new Date()
            const oneMonthAgo = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
            );

            const lastMontPost = await Post.countDocuments({
                createdAt: { $gte: oneMonthAgo }
            })

            res.status(200).json({
                success: true,
                data: posts,
                total,
                lastMontPost
            })
        } catch (error) {
            next(errorHandler(error))
        }
    },

    createPost: async (req, res, next) => {
        if (!req.user.isAdmin) return next(errorHandler(403, 'Not allow to create post'));
        if (!req.body.title || !req.body.content) return next(errorHandler(400, 'Provide all the fields..'));

        try {
            const slug = req.body.title.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9]/g, '-');

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
        const { postId, userId } = req.params
        console.log(postId, userId);
        const { isAdmin, id } = req.user
        if (!isAdmin || id !== userId) return next(errorHandler(403, 'Not allow to delete post'));
        try {
            const deletePost = await Post.findByIdAndDelete(postId);
            res.status(200).json({ success: true, message: "Post has been deleted successfully..." })
        } catch (error) {
            next(errorHandler(error))
        }
    },

    updatePost: async (req, res, next) => {


    }
}

export default postController