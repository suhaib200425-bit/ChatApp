const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/DBConnections");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
}));
// DATABASE CONNECTION
connectDB()

app.get("/", (req, res) => {
    res.send("API Running...");
});

app.use("/api/user", require('./routes/userRouters'))
app.use("/api/message", require('./routes/messageRouter'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});