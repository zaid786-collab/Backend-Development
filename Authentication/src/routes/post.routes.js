const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const userModel = require("../models/user.model");

router.post("/build", async (req,res) => {

    const tok = req.cookies.token;

    if(!tok) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }


    try {
        const decoded = jwt.verify(tok,process.env.JWT_SECRET);
        
        const user = await userModel.findOne({
            _id: decoded.id
        })

        console.log(user);

    } catch (error) {
        return res.status(401).json({
            message : "Token is Invalid"
        })
    }
   

    res.send("Post created successfully");
})

module.exports = router;