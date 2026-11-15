const express = require('express');
const musicController = require("../controllers/music.controller");

const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

//  This API will only be acceed by artists to create their music.
const router = express.Router();

router.post("/create", upload.single("music"),musicController.createMusic);

module.exports = router;