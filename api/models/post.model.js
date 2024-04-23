import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: [true, 'user id must be provided'],
    },
    content: {
        type: String,
        require: [true, 'content must be provided']
    },
    title: {
        type: String,
        require: [true, 'title must be provided'],
        unique: true
    },
    image: {
        type: String,
        default: 'https://taj.im/wp-content/uploads/2016/02/default.jpg'
    },
    category: {
        type: String,
        default: 'uncategorized'

    },
    slug: {
        type: String,
        require: [true, 'slug must be provided'],
        unique: true
    }
}, { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
