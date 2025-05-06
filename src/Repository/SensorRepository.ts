import { ISensorRepository } from "./ISensorRepository.js";
import * as QueryString from "node:querystring";
import {IMariaDBService, MariaDBService} from "../Service/MariaDBService.js";


export class SensorRepository implements ISensorRepository {

    private databaseService : IMariaDBService = new MariaDBService();

    // @ts-ignore
    async readAllSensors(id: string | QueryString.ParsedQs | (string | QueryString.ParsedQs)[], range: string | QueryString.ParsedQs | (string | QueryString.ParsedQs)[]) {

        var todaysDate = new Date();
        var todaysDateString: string = todaysDate.toISOString().split("T")[0];


        var dateRange = new Date();
        dateRange.setDate(todaysDate.getDate() - (<number><unknown>range));
        let dateRangeString = dateRange.toISOString().split("T")[0];

        var query = "SELECT * FROM device_data WHERE PIE_ID = ? AND DATE <= ? AND DATE >= ?";

        return await this.databaseService.query(query, [id, todaysDateString, dateRangeString]);
    }

}