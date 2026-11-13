const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const app = require('./src/app');
const connectTODB = require('./src/db/db');

connectTODB();

app.listen(3000, () => {
    console.log('Server is running on Port 3000');
})

app.get('/', (req,res) => {
    res.send('Server is working');
});


app.post("/api/auth", (req,res) => {
    res.status(201).json({
        message: "User created successfully",
        data: req.body
    });
});