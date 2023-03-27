import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

// pull env variables from dotenv file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// create routes, api endpoints that frontend connect to
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// route to verify backend working
app.get('/', async (req, res) => {
    res.send('Hello from DAVOLIO!');
})

// start server and connect to mongodb
const startServer = async () => {
    // connecting to mongodb may fail, use try catch block
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'));
    } catch (error) {
        console.log(error);
    }
}

startServer();