import express from "express";
import { getSuburbCoordinates } from "../controllers/suburbCoordinateController.js";

const router = express.Router();

router.get("/", getSuburbCoordinates)

export default router;