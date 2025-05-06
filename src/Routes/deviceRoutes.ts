import express from "express";
import {SensorController} from "../Controller/SensorController.js";
import DeviceController from "../Controller/deviceController.js";
import {DeviceRepositoryMariaDB} from "../Repository/DeviceRepositoryMariaDB.js";

const deviceRoutes = express.Router();

const sensorController = new SensorController();

deviceRoutes.get("/" , (req, res) => res.send("Welcome"));
const {getDeviceByMac, getDeviceById, getDevices} = new DeviceController(new DeviceRepositoryMariaDB());

deviceRoutes.get("/id/:id", getDeviceById);
deviceRoutes.get("/mac/:mac", getDeviceByMac);
deviceRoutes.get("/", getDevices);

deviceRoutes.get("/sensor", (req, res) =>
    sensorController.getSensorData(req, res));



export { deviceRoutes };