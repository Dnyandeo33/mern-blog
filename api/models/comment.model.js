import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: []
    },
    numberOfLikes: {
        type: Number,
        default: 0
    },
}, { timeStamp: true });

const Comment = mongoose.model('comment', commentSchema);

export default Comment
