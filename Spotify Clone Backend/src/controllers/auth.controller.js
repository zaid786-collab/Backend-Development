const userModel = require('../models/user.models');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


async function registerUser(req,res) {

    const {username, email, password, age , role = "user"} = req.body;

    const isuniqueuser = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if(isuniqueuser) {
        return res.status(409).json({
            message : "User already exists with this name or email"
        })
    }

    const hash = await bcrypt.hash(password,  10);

    const user = await userModel.create({
        username,
        email,
        role,
        password : hash,
        age,
    })

    const token = jsonwebtoken.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message : "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            age: user.age,
        }
    })

}

async function loginUser(req,res) {

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(!user) {
        return res.staus(401).json({message: "Invalid credentials"});
    }

    
}

module.exports = { registerUser };