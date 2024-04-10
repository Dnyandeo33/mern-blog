import bcryptjs from 'bcryptjs';
import validator from "validator";
import User from "../models/user.model.js";

const authController = {
    signUp: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const existEmail = await User.findOne({ email });

            if (existEmail) return res.status(200).json({ message: 'Email already exist, please sing-in' });
            if (!username || !email || !password) return res.status(400).json({ message: 'All fields required' });
            if (!validator.isEmail(email)) return res.status(400).json({ success: false, message: 'Email must be valid' });
            if (!validator.isStrongPassword(password)) return res.status(400).json({ success: false, message: 'Password must be strong' });

            const hashPassword = await bcryptjs.hash(password, 10);

            const newUser = await User.create({
                username,
                email,
                password: hashPassword
            })
            return res.status(201).json({ success: true, message: 'user created successfully..' })

        } catch (error) {
            return res.status(500).json({ success: false, message: error })
        }
    },

    signIn: async (req, res) => {
    },
    signOut: async (req, res) => {
    }
}

export default authController;