const express = require('express');
const musicController = require("../controllers/music.controller");
const authMiddelware = require("../middlewares/auth.middleware");

const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();


//  These API will only be acceed by artists to create their music and albums.

router.post("/create", authMiddelware.authArtist,upload.single("music"),musicController.createMusic);

router.post("/album", authMiddelware.authArtist, musicController.createAlbum);



module.exports = router;