// In this file we write the logic of functions to perform on the data and messages.

const userModel = require("../models/user.model");

// To require jsonwebtoken to create tokens : 
const jwt = require("jsonwebtoken");

async function registerUser(req,res) {

    try {
        const {username,email,password} = req.body;

        const isUerAlreadyExists = await userModel.findOne({
            email
        });

        if(isUerAlreadyExists) {
            return res.status(409).json({
                message: "User with this email already exists"
            })
        }

        const user = await userModel.create({
            username, email , password
        })

        // This method create token and here sign() needs 2 things data of users whose token is needed and it should be unique.
        // jwt performs lot of calculations on user data and then make well calculated string called as token.
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token);

        res.status(201).json({
            message: "User registerd successfully and token created",
            user,
        })
    } catch (error) {

        if(error.code === 11000) {
            return res.staus(409).json({
                message: "Email already registered"
            });
        }

        res.status(500).json({
            message : "Something went wrong",
            error: error.message
        });
    }
    
}

// async function registerUser(req, res) {

//     try {
//         const { username, email, password } = req.body;

//         console.log("Registering email:", email);

//         const user = await userModel.create({
//             username,
//             email,
//             password
//         });

//         console.log("User created:", user._id);

//         res.status(201).json({
//             message: "User registered successfully",
//             user
//         });

//     } catch (error) {

//         console.log("ERROR:", error);
//         console.log("ERROR CODE:", error.code);

//         if (error.code === 11000) {
//             return res.status(409).json({
//                 message: "Email already registered"
//             });
//         }

//         return res.status(500).json({
//             message: "Something went wrong",
//             error: error.message
//         });
//     }
// }

module.exports = {registerUser}