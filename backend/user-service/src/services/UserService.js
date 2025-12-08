// backend/user-service/src/services/UserService.js

const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const HASH_SALT_ROUNDS = 10; 

const UserService = {
    async registerNewUser(userData) {
        const { name, email, password } = userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already in use.'); 
        }

        const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword, 
        });

        const savedUser = await newUser.save();
        
        return { 
            id: savedUser._id, 
            name: savedUser.name, 
            email: savedUser.email,
            subscriptionPlan: savedUser.subscriptionPlan
        };
    },

    async authenticateUser(credentials) {
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password.');
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            subscriptionPlan: user.subscriptionPlan
        };
    },
};

module.exports = UserService;