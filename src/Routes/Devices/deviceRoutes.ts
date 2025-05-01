import express from "express";
import DeviceController from "../../controller/deviceController";

const deviceRoutes = express.Router();
const deviceController = new DeviceController();


deviceRoutes.get("/" , (req, res) => res.send("Welcome"));
deviceRoutes.get("/device/:id" , (req, res) => deviceController.getDevice(req, res));
deviceRoutes.get("/devices", (req, res) => deviceController.getDevices(req, res));
export { deviceRoutes };