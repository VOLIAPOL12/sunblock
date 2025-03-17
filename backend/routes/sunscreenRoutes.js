// const express = require("express");
// const router = express.Router();
// const { calculateSunscreen } = require("../controllers/sunscreenController");

// router.post("/calculate", calculateSunscreen);

// module.exports = router;
import express from "express";
import { calculateSunscreen } from "../controllers/sunscreenController.js";

const router = express.Router();

router.post("/calculate", calculateSunscreen);

export default router;
