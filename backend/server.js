import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import clothingRoutes from "./routes/clothingRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(morgan("dev"));

app.use("/api/clothing", clothingRoutes);

app.listen(PORT, () => {
    console.log("Served on " + PORT);
})