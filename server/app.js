import app from "./src/express.js";
import 'dotenv/config';
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
