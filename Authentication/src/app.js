const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const postroutes = require("./routes/post.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

// To access the api's created by router use this prefix : /api/auth.
app.use("/api/auth",authRoutes);

app.use("/api/post",postroutes);

module.exports = app;