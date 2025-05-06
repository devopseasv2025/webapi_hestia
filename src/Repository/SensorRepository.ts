import { ISensorRepository } from "./ISensorRepository.js";
import {asyncFunction} from "../Service/Database.js";
import * as QueryString from "node:querystring";

export class SensorRepository implements ISensorRepository {

    // @ts-ignore
    async readAllSensors(id: string | QueryString.ParsedQs | (string | QueryString.ParsedQs)[], range: string | QueryString.ParsedQs | (string | QueryString.ParsedQs)[]) {

        var todaysDate = new Date();
        var todaysDateString: string = todaysDate.toISOString().split("T")[0];


        var dateRange = new Date();
        dateRange.setDate(todaysDate.getDate() - (<number><unknown>range));
        let dateRangeString = dateRange.toISOString().split("T")[0];

        var query = "SELECT * FROM device_data WHERE PIE_ID = ? AND DATE <= ? AND DATE >= ?";

        return await asyncFunction(query, [id, todaysDateString, dateRangeString]);
    }

}