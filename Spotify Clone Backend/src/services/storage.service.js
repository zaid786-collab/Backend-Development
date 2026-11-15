const  ImageKit = require('@imagekit/nodejs');

// To store the music files of artists we are using image Kit

console.log("Private key exists:", !!process.env.IMAGEKIT_PRIVATE_KEY);
console.log("Private key length:", process.env.IMAGEKIT_PRIVATE_KEY?.length);
console.log("Private key prefix:", process.env.IMAGEKIT_PRIVATE_KEY?.slice(0, 8));

const client = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
});

async function uploadfile(file) {
    const result = await client.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "yt-complete-backend/music"
    })

    return result;
}

module.exports = {uploadfile};