const musicModel = require("../models/music.model");
const jsonwebtoken = require('jsonwebtoken');
const {uploadfile} = require("../services/storage.service");

const albumModel = require("../models/album.model");

async function createMusic(req,res) {
    //  Logic of auth is send to middelwares to avoid repetation of code.

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
        artist: req.user.id,
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


async function createAlbum(req,res) {

    // Auth logic is sent to middleware from here to avoid repetation in code.

    const { title , musics } = req.body;

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics,
    })

    res.status(201).json({
        message: "Album created successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics,
        }
    })
}

module.exports = { createMusic , createAlbum};