import express from "express";
import { asyncFunction } from "../../Service/Database.js";
import {SensorController} from "../../Controller/SensorController";

const deviceRoutes = express.Router();

const sensorController = new SensorController();

deviceRoutes.get("/" , (req, res) => res.send("Welcome"));

deviceRoutes.get("/senor", (req, res) =>
    sensorController.getSensorData(req, res));



export { deviceRoutes };