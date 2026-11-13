const express = require('express');
const authcontroller = require("../controllers/auth.controller");

const route = express.Router();

route.post('/register',authcontroller.registerUser);

module.exports = route;

