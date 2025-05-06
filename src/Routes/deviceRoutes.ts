import express from "express";
import DeviceController from "../controller/deviceController.js";
import {asyncFunction} from "../Service/Database.js";
import {DeviceRepositoryMariaDB} from "../Repository/DeviceRepositoryMariaDB.js";
import {MariaDBService} from "../Service/MariaDBService.js";

const deviceRoutes = express.Router();
const mariaDBService = new MariaDBService();

const {getDeviceByMac, getDeviceById, getDevices} = new DeviceController(new DeviceRepositoryMariaDB(mariaDBService));

const sensorController = new SensorController();

deviceRoutes.get("/id/:id", getDeviceById);
deviceRoutes.get("/mac/:mac", getDeviceByMac);
deviceRoutes.get("/", getDevices);

deviceRoutes.get("/sensor", (req, res) =>
    sensorController.getSensorData(req, res));



export { deviceRoutes };