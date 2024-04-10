import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/connectionDb.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config();
connectDb();
const PORT = process.env.PORT || 5009

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


// 404
app.use('*', (req, res) => {
    res.status(404).json({ message: 'page not found' })
})

// server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
})
