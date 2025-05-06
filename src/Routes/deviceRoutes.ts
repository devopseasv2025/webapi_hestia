import express from "express";
import { asyncFunction } from "../../Service/Database.js";
import {SensorController} from "../../Controller/SensorController";
import DeviceController from "../controller/deviceController.js";
import {asyncFunction} from "../Service/Database.js";
import {DeviceRepositoryMariaDB} from "../Repository/DeviceRepositoryMariaDB.js";

const deviceRoutes = express.Router();

const sensorController = new SensorController();

deviceRoutes.get("/" , (req, res) => res.send("Welcome"));
const {getDeviceByMac, getDeviceById, getDevices} = new DeviceController(new DeviceRepositoryMariaDB());

deviceRoutes.get("/id/:id", getDeviceById);
deviceRoutes.get("/mac/:mac", getDeviceByMac);
deviceRoutes.get("/", getDevices);

deviceRoutes.get("/senor", (req, res) =>
    sensorController.getSensorData(req, res));



export { deviceRoutes };