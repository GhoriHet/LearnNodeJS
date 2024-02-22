const express = require('express');
const router = require('./routes/v1');
const connectDB = require('./db');
const app = express();


connectDB()

app.use(express.json()); // for parsing application/json    
app.use("/api/v1", router)

app.listen(3000, () => {
    console.log("Server started on port 3000");
})