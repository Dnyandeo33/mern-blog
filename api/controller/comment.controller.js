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

    likeComment: async (req, res, next) => {
        try {
            const comment = await Comment.findById(req.params.commentId);
            if (!comment) return next(errorHandler(404, 'comment not found'));

            if (comment.likes.includes(req.user.id)) {
                comment.numberOfLikes -= 1
                comment.likes.pull(req.user.id);
            } else {
                comment.numberOfLikes += 1
                comment.likes.push(req.user.id);
            }
            await comment.save();
            res.status(200).json({ success: true, comment });
        } catch (error) {
            next(error)
        }
    },

    editComment: async (req, res, next) => {
        try {
            const comment = await Comment.findById(req.params.commentId);
            if (!comment) return next(errorHandler(404, 'comment not found'));

            if (comment.userId !== req.user.id && !req.user.isAdmin) return next(errorHandler(403, 'you are not allow to edit this comment'));

            const editComment = await Comment.findByIdAndUpdate(req.params.commentId, {
                content: req.body.content
            }, { new: true });

            res.status(200).json({ success: true, editComment });
        } catch (error) {
            next(error)
        }
    },

    deleteComment: async (req, res, next) => {
        try {
            const comment = await Comment.findById(req.params.commentId);

            if (!comment) return next(errorHandler(404, 'comment not found'));
            if (comment.userId !== req.user.id && !req.user.isAdmin) return next(errorHandler(403, 'you are not allow to delete this comment'));

            await Comment.findByIdAndDelete(req.params.commentId);

            res.status(200).json({ success: true, message: 'comment deleted successfully' });
        } catch (error) {
            next(error)
        }
    },

    getAllComments: async (req, res, next) => {
        if (!req.user.isAdmin) return next(errorHandler(403, "You are not allow to get all comments"))
        try {
            const startIndex = parseInt(req.query.startIndex) || 0;
            const limit = parseInt(req.query.limit) || 9;
            const sortDirection = req.query.order === 'asc' ? 1 : -1;

            const comments = await Comment.find()
                .sort({ createdAt: sortDirection })
                .skip(startIndex)
                .limit(limit);

            const totalComments = await Comment.countDocuments();

            const now = new Date();
            const oneMonthAgo = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate()
            )

            const lastMonthComments = await Comment.countDocuments({
                createdAt: {
                    $gte: oneMonthAgo,
                }
            })
            res.status(200).json({ success: true, comments, totalComments, lastMonthComments });

        } catch (error) {
            next(error)
        }
    }
}

export default commentController