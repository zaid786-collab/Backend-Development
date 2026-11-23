// In our controllers we are checking if token is present or not and if so then it belongs to the artist or not so to avoid repetative code we will use middlewares.

const jwt = require("jsonwebtoken");

async function authArtist (req,res,next) {

    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({message : "Unauthorised User"});
    }

    let decoded; // to verify token

    try {

        decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "artist") {
            return res.status(403).json({message: "You don't have access to create music or album"});
        }

        req.user = decoded;

        next();
        // In middelwares we use next() so that our request can move to next controller or route for other operations.

    } catch(error) {
        console.log(error);
        return res.status(401).json({message : " Wrong Token, Unauthorised User Access"})
    }
}

async function authUser(req, res, next) {

    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({message : "Unauthorised User"});
    }

    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(decoded.role !== "user" && decoded.role !== "artist") {
            return res.status(403).json({ message: "You don't have access"});
        }

        req.user = decoded;

        next();

    } catch(error) {
        console.log(error);
        return res.status(401).json({message: "Unauthorized"});
    }
}

module.exports = {authArtist, authUser};

//  Importance of Middelwares : 
// 1. Middelwares can read all the data that comes in a request.
// 2. Middelwares can modify the data that comes in a request.
// 3. Middelwares can send the respnse anytime along with controllers.