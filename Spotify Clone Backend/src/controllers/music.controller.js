const musicModel = require("../models/music.model");
const jsonwebtoken = require('jsonwebtoken');
const {uploadfile} = require("../services/storage.service");

async function createMusic(req,res) {

    const token = req.cookies.token;

    // To check if token is present or not
    if(!token) {
        return res.status(401).json({message : "Unauthorized"});
    }

    let decoded;

    try {

        // Verify the token :
        decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        // If token is present but role is not artisi then do not give access
        if(decoded.role !== "artist") {
           return res.status(403).json({message : "You don't have access to create an music"}); 
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({message : "Unauthorized User"});    
    }

    const { title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: "Please upload a music file"
        });
    }

    const result = await uploadfile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id,
    })

    res.status(201).json({
        message : "Music created successfully",
        music_details : {
            id: music.id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
        }
    })
}

module.exports = { createMusic };