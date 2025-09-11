const express = require("express")
const notesRoutes = require("./routes/notesRoutes")
const connectDB = require("./config/db")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors");
const path = require("path")

dotenv.config()


//middleware
app.use(express.json()); // allows us to parse req.body

if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}

app.use("/api/notes", notesRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/api/notes`);
    })
})