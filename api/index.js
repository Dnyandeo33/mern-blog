import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import connectDb from './config/connectionDb.js';
import authRoutes from './routes/auth.route.js';
import commentRoutes from './routes/comment.route.js';
import postRoutes from './routes/post.route.js';
import userRoutes from './routes/user.route.js';


dotenv.config();
connectDb();
const PORT = process.env.PORT || 5009

const __dirname = path.resolve()

const app = express();


app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});


// server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
})
