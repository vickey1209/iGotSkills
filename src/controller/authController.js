
const express = require('express');
const User = require("../models/user")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();


const register = async (req, res) => {
    console.log('Request====>', req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        console.log('missing details=====> ', { username, email, password });
        return res.status(400).json({ message: 'provide all details ' });
    }

    try {
        let user = await User.findOne({ email });

        if (user) {
            console.log('user already in Database', email);
            return res.status(400).json({ message: 'user exist' });
        }

        user = new User({ username, email, password });
        await user.save();
        console.log('User saved===>', user);

        const token = generateToken(user._id);
        console.log('generated token==>', token);

       
        res.status(200).json({ 
            success: true,
            message: 'user registered successfully',
            token: token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (err) {
        console.error('error in reg.====>', err);
        res.status(500).json({ message: 'server error' });
    }
};




const login = async (req, res) => {
    console.log('Request body:', req.body); 

    const { email, password } = req.body;
    console.log('Email:', email); 
    console.log('Password:', password); 

    try {
        const user = await User.findOne({ email });
        console.log('User found:', user); 

        if (!user) {
            return res.status(400).json({ message: 'invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        console.log('Password match===>', isMatch); 

        if (!isMatch) {
            return res.status(400).json({ message: 'invalid credentials' });
        }

        const token = generateToken(user._id);
        console.log('generated token==>', token); 

        res.status(200).json({ 
            success: true,
            message: 'user login successfully',
            token: token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (err) {
        console.error('error in ====>', err); 
        res.status(500).json({ message: 'Server error' });
    }
};

//JWT TOKEN GENERATE
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {register , login }
