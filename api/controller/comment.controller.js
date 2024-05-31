import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

const commentController = {
    createComment: async (req, res, next) => {
        const { content, postId, userId } = req.body;
        try {
            if (userId !== req.user.id) return next(errorHandler(403, 'you are not allow to create comment'))

            const newComment = await new Comment({
                content,
                postId,
                userId
            });
            await newComment.save();
            res.status(201).json({ success: true, newComment });
        } catch (error) {
            next(error)
        }
    },

    getComments: async (req, res, next) => {
        try {
            const comments = await Comment.find({ postId: req.params.postId }).sort({
                createdAt: -1
            });

            res.status(200).json({ success: true, comments });
        } catch (error) {
            next(error)
        }
    },
}

export default commentController