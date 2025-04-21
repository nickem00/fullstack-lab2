import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Express backend!");
});

app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error"})
})

export default app;