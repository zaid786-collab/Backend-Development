const userModel = require('../models/user.models');
const jsonwebtoken = require('jsonwebtoken');

userModel();

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

    const user = await userModel.create({
        username,
        email,
        role,
        password,
        age,
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)

    res.cookies("token", token);

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