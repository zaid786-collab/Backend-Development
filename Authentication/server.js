const dns = require('dns');

dns.setServers(['8.8.8.8' , '8.8.4.4']);

require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");


const PORT = 3000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log("Server startup failed: ",err);
    }
}

startServer();