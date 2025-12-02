import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/dbConfig";
import propertyRoutes from "./routes/siteDetailRoute";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/property", propertyRoutes);

export default app;
