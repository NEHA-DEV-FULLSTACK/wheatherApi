require('dotenv').config();
const express = require('express');
const { router } = require('./routes/index');
const { connectDb } = require('./database/server');
const app = express();
const PORT = process.env.PORT;

connectDb();

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
    console.log("server is running on", PORT)
})