const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(express.json());

//app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const ConnectDB = require("./config/db");
ConnectDB();

app.use("/api/users", userRoutes);

app.use("/api/events", eventRoutes);
