import express from "express";
import DeviceController from "../../controller/deviceController.js";
import {asyncFunction} from "../../Service/Database.js";
import {DeviceRepositoryMariaDB} from "../../Repository/DeviceRepositoryMariaDB.js";

const deviceRoutes = express.Router();
const deviceController = new DeviceController(new DeviceRepositoryMariaDB());


deviceRoutes.get("/id/:id", deviceController.getDeviceById);
deviceRoutes.get("/mac/:mac", deviceController.getDeviceByMac);
deviceRoutes.get("/", deviceController.getDevices);

deviceRoutes.get("/temp", async (req, res) => {
    const id = req.query.id;
    const range = req.query.range;

    // @ts-ignore
    var datesNeeded = getDate(range);
    var todayDateString = datesNeeded[0];
    var dateRangeString = datesNeeded[1];

    var query = "SELECT TEMP FROM device_data WHERE PIE_ID = ? AND DATE <= ? AND DATE >= ?";

    res = await asyncFunction(query, [id, todayDateString, dateRangeString]);

    res.send()
});

deviceRoutes.get("/airhumid", async (req, res) => {
    const id = req.query.id;
    const range = req.query.range;

    // @ts-ignore
    var datesNeeded = getDate(range);
    var todayDateString = datesNeeded[0];
    var dateRangeString = datesNeeded[1];

    var query = "SELECT AIR_HUMID FROM device_data WHERE PIE_ID = ? AND DATE <= ? AND DATE >= ?";

    res = await asyncFunction(query, [id, todayDateString, dateRangeString]);

    res.send()

})

deviceRoutes.get("/ppm", async (req, res) => {
    const id = req.query.id;
    const range = req.query.range;

    // @ts-ignore
    var datesNeeded = getDate(range);
    var todayDateString = datesNeeded[0];
    var dateRangeString = datesNeeded[1];

    var query = "SELECT PPM FROM device_data WHERE PIE_ID = ? AND DATE <= ? AND DATE >= ?";

    res = await asyncFunction(query, [id, todayDateString, dateRangeString]);

    res.send()

})

deviceRoutes.get("/soilMoisture", async (req, res) => {
    const id = req.query.id;
    const range = req.query.range;

    // @ts-ignore
    var datesNeeded = getDate(range);
    var todayDateString = datesNeeded[0];
    var dateRangeString = datesNeeded[1];

    var query = "SELECT SOIL_MOISTURE FROM device_data WHERE PIE_ID = ? AND DATE <= ? AND DATE >= ?";

    res = await asyncFunction(query, [id, todayDateString, dateRangeString]);

    res.send()

})

deviceRoutes.get("/pressure", async (req, res) => {
    const id = req.query.id;
    const range = req.query.range;

    // @ts-ignore
    var datesNeeded = getDate(range);
    var todayDateString = datesNeeded[0];
    var dateRangeString = datesNeeded[1];

    var query = "SELECT PRESSURE FROM device_data WHERE PIE_ID = ? AND DATE <= ? AND DATE >= ?";

    res = await asyncFunction(query, [id, todayDateString, dateRangeString]);

    res.send()

})



export { deviceRoutes };