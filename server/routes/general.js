import express from "express";
import { getDashboardStatistics, getUser } from "../controllers/general.js";

const router = express.Router();
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStatistics);

export default router;
