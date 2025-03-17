import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import clothingRoutes from "./routes/clothingRoutes.js";
import suburbCoordinates from "./routes/suburbCoordinateRoutes.js";
import sunscreenRoutes from "./routes/sunscreenRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(morgan("dev"));

app.use("/api/clothing", clothingRoutes);

app.use("/api/suburbCoordinates", suburbCoordinates);

app.use("/api/sunscreen", sunscreenRoutes);

async function initDB() {
    try {
        const res = await pool.query("SELECT * from victorian_suburb_coordinates");
        console.log(res.rows);
    } catch (error) {
        console.log("Error initDB", error);
    }
}

app.listen(PORT,'127.0.0.1', () => {
    console.log(`Server is running on port ${PORT}`);
})