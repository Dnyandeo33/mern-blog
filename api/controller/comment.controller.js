import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

const commentController = {
    createComment: async (req, res, next) => {
        const { comment, postId, userId } = req.body;
        console.log(comment, postId, userId);
        try {
            if (userId !== req.user.id) return next(errorHandler(403, 'you are not allow to create comment'))

            const newComment = await new Comment({
                comment,
                postId,
                userId
            });

            await newComment.save();

            res.status(201).json({ success: true, newComment });
        } catch (error) {
            next(error)
        }
    }

}

export default commentController