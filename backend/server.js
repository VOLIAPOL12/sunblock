import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import clothingRoutes from "./routes/clothingRoutes.js";
import suburbCoordinates from "./routes/suburbCoordinateRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use(morgan("dev"));

app.use("/api/clothing", clothingRoutes);

app.use("/api/suburbCoordinates", suburbCoordinates)

if(process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log("Served on " + PORT);
})