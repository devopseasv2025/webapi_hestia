import express from "express";
import DeviceController from "../../controller/deviceController.js";

const deviceRoutes = express.Router();
const {getDeviceById, getDeviceByMac, getDevices} = new DeviceController();


deviceRoutes.get("/id/:id", getDeviceById);
deviceRoutes.get("/mac/:mac", getDeviceByMac);
deviceRoutes.get("/", getDevices);

export { deviceRoutes };