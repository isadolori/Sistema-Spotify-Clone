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
};

module.exports = UserService;