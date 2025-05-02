import express from "express";
import { asyncFunction } from "../../Service/Database.js";

const deviceRoutes = express.Router();

function getDate(range: number): string[]{
    var todaysDate = new Date();
    var todaysDateString: string = todaysDate.toISOString().split("T")[0];


    var dateRange = new Date();
    dateRange.setDate(todaysDate.getDate() - range);
    let dateRangeString = dateRange.toISOString().split("T")[0];

    return [todaysDateString, dateRangeString];
}

deviceRoutes.get("/" , (req, res) => res.send("Welcome"));

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