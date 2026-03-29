const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/DBConnections");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(express.json());
const allowedOrigins = [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
// DATABASE CONNECTION
connectDB()

app.get("/", (req, res) => {
    res.send("API Running...");
});

app.use("/api/user", require('./routes/userRouters'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});