import express from "express";
import {AnalyticsController} from "../controller/analyticsController.js";

const analyticsRoutes = express.Router();
const analyticsController = new AnalyticsController();

analyticsRoutes.post("/analytics", (req, res) => analyticsController.calculateRequest(req, res));

export { analyticsRoutes };