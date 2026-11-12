// On Production Scale,create an API here : 
const express = require("express");
const authController = require("../controllers/auth.controller")

const router = express.Router();

// API to Post Register : 
router.post("/register", authController.registerUser)

router.get("/testing", (req,res) => {
    console.log("Cookies : ",req.cookies);
    res.json({
        message: "Test route sec",
        cookies: req.cookies
    })
})

module.exports = router;