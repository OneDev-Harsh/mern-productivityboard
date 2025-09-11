const express = require("express")
const notesRoutes = require("./routes/notesRoutes")
const connectDB = require("./config/db")
const dotenv = require("dotenv")
const app = express()
const cors = require("cors");

dotenv.config()

//middleware
app.use(express.json()); // allows us to parse req.body
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use("/api/notes", notesRoutes)

PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/api/notes`);
    })
})