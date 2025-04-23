import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();



import sendRouter from "./routers/sendRouter.js";



const app = express();
const PORT = process.env.PORT;
const db = process.env.DB_CONNECTION;

app.use(express.json());
app.use(cors());


//Routes
app.use('/api', sendRouter);


await mongoose
    .connect(db)

    .then(() => console.log('MongoDB connected'))

    .catch((err) => console.log(err));

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
});
