const express = require('express');
const authcontroller = require("../controllers/auth.controller");

const route = express.Router();

route.post('/register',authcontroller.registerUser);

route.post('/login', authcontroller.loginUser);

route.post("/logout",authcontroller.logoutUser);

module.exports = route;

// Token Black Listing to safe token of one user from other.

