import bcryptjs from 'bcryptjs';
import e from 'express';
import jsw from 'jsonwebtoken';
import validator from "validator";
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';

const authController = {
    signUp: async (req, res, next) => {
        try {
            // get the info from body
            const { username, email, password } = req.body

            // check username & email exist or not
            const existUsername = await User.findOne({ username })
            const existEmail = await User.findOne({ email });

            //if exist then give the error
            if (existUsername) next(errorHandler(403, 'Username already exist, please try different'));
            if (existEmail) next(errorHandler(403, 'Email already exist...'));

            // if required field not fill then give the error
            if (!username || !email || !password) next(errorHandler(400, 'All fields required'));

            // validate email using validator npm package
            if (!validator.isEmail(email)) next(errorHandler(400, 'Email must be valid'));

            // validate strong password 
            if (!validator.isStrongPassword(password)) {
                next(errorHandler(400, 'Password must be strong'));
            } else {

                // hash password
                const hashPassword = await bcryptjs.hash(password, 10);

                // create new user 
                const newUser = await User.create({
                    username,
                    email,
                    password: hashPassword
                })
                return res.status(201).json({ success: true, message: 'user created successfully..' });
            }
        } catch (error) {
            next(error);
        }
    },

    signIn: async (req, res, next) => {

        // get info from body
        const { email, password } = req.body;

        // check email & password provide or not
        if (!email || !password) return next(errorHandler(400, 'All fields required...'));

        try {
            // check is user valid or not 
            const isValidUser = await User.findOne({ email });

            // if not give the error
            if (!isValidUser) return next(errorHandler(400, 'User not found'));

            // remove the password for the response
            const { password: pass, ...rest } = isValidUser._doc;

            // compare password 
            const isValidPassword = bcryptjs.compareSync(password, isValidUser.password);
            if (!isValidPassword) return next(errorHandler(400, 'Invalid password'));

            // create token using npm jesonwebtoken  
            const token = jsw.sign({ id: isValidUser._id }, process.env.JWT_SECRET);
            res.status(200).cookie('access_token', token, { httpOnly: true }).json({ success: true, rest });

        } catch (error) {
            next(error);
        }
    },
    google: async (req, res, next) => {
        // get the info from body
        const { email, name, googlePhotoUrl } = req.body

        try {
            // check the user has already exist or not 
            const existEmail = await User.findOne({ email })

            // if email exit set the token 
            if (existEmail) {
                const token = jsw.sign({ id: existEmail._id }, process.env.JWT_SECRET);
                const { password: pass, ...rest } = existEmail._doc;
                res.status(200).cookie('access_token', token, { httpOnly: true }).json({ success: true, rest });
            }
            // else generate radom password, hash password 
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = await bcryptjs.hash(generatedPassword, 10);

            // create new use pass name as username 
            const newUser = await User.create({
                // create name unique and lowercase Ex. Jon Don to jondon4563
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashPassword,
                profilePic: googlePhotoUrl
            });

            // after creating new user set the token
            const token = jsw.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, { httpOnly: true }).json({ success: true, rest });
        } catch (error) {
            next(error)
        }
    },
    signOut: async (req, res) => {
    }
}

export default authController;