import Logger from "../Infrastructure/Logger/logger.js";
import express from "express";
import {ICalculationRequest} from "../Entities/Interfaces/ICalculationRequest";
import {isNonEmptyArray, isValidDate, isValidNumber} from "../Utilities/validateData.js";
import {getDataByPieId} from "../Repository/memoryDeviceRepository.js";
import {IDaoRawSensorData, ISensorData} from "../Entities/Interfaces/ISensorData";
import {AnalyticsServices} from "../Service/analyticsServices.js";
import { EdgeFeatureHubConfig, Readyness, ClientContext } from "featurehub-javascript-client-sdk";

export class AnalyticsController {

    private client: any = null;
    private ready: any = false;

    public async init(): Promise<void> {
        try {
            const fhConfig = new EdgeFeatureHubConfig(
                "http://featurehub:8085",
                "e545216c-a370-4f6e-a389-f6e6edb67cd8/ArtHAYoTsGiA3LC9lEF2crPNnYVUgrRDQFFL4KUb"
            );

            const clientContext = fhConfig.newContext();
            await clientContext.build();
            this.client = clientContext;

            fhConfig.addReadynessListener((readyness) => {
                if (readyness === Readyness.Ready) {
                    this.ready = true;
                }
            });

        } catch (error) {
            Logger.error("Failed to initialize FeatureHub:", error);
            throw error;
        }
    }

    public getFeatureBoolean(key: string, defaultValue: boolean = false): boolean {
        if (this.ready) {
            Logger.info("FeatureHub not ready, returning default", { key, defaultValue });
            return defaultValue;
        }

        try {

            const value = this.client.feature(key).getBoolean();
            Logger.info(`Feature Boolean ${value}`);
            return value ?? defaultValue;
        } catch (error) {
            Logger.error(`Error getting boolean feature "${key}":`, error);
            return defaultValue;
        }
    }




    public async calculateRequest(req: express.Request, res: express.Response) {
        let request = req.body as ICalculationRequest;

        if( this.validateSensorData(req, res) === res.status(400)){
            return res.send
        }

        //TODO: IMPLEMENT ACTUAL REPO HERE!!!
        const dataMemory: ISensorData[] = getDataByPieId(request.PIE_ID);
        //PIE_ID, DAYS_BACK
        //END TODO

        // ✅ Dynamic extraction of sensor data into arrays
        const sensorFields = request.SENSOR; // e.g., ["TEMP", "PPM", ...]
        const sensorValuesMap: Record<string, number[]> = {};
        const requestedCalcFields = request.CALCULATION; // e.g., ["average", "min", "max" ...]

        for (const field of sensorFields) {
            sensorValuesMap[field] = dataMemory
                .map(entry => entry[field.toUpperCase() as keyof IDaoRawSensorData])
                .filter(value => typeof value === "number") as number[];
        }

        const anaService = new AnalyticsServices();

        requestedCalcFields.forEach(field => {
            for (const sensorField of sensorFields) {
                const values = sensorValuesMap[sensorField];
                if (values && values.length > 0) {
                    switch (field.toUpperCase()) {
                        case "SUM":
                            sensorValuesMap[`${sensorField}_sum`] = [anaService.sum(values)];
                            break;
                        case "AVERAGE":
                            sensorValuesMap[`${sensorField}_average`] = [anaService.average(values)];
                            break;
                        case "MIN":
                            sensorValuesMap[`${sensorField}_min`] = [anaService.min(values)];
                            break;
                        case "MAX":
                            sensorValuesMap[`${sensorField}_max`] = [anaService.max(values)];
                            break;
                        case "COUNT":
                            const value = this.getFeatureBoolean("CountFeature")
                            if (this.getFeatureBoolean("CountFeature")){
                                sensorValuesMap[`${sensorField}_count`] = [anaService.count(values)];
                            } else{
                                sensorValuesMap[`${sensorField}_count`] = [0];
                                Logger.info("Count calculation is turned off.")
                                Logger.info(`Readiness ${this.ready}`)
                                Logger.info(value);
                            }
                            break;
                        default:
                            Logger.error(`Unknown calculation type: ${field}`);
                    }
                }
            }
        })

        console.table(sensorValuesMap);


        return res.status(200).json(sensorValuesMap);

        // Valid request
    }

    private validateSensorData(req: express.Request, res: express.Response) {
        const request = req.body as ICalculationRequest;

        // Check if PIE_ID is a valid number
        if (!isValidNumber(request.PIE_ID)) {
            Logger.error('Invalid PIE_ID: ', req.body);
            return res.status(400).json({
                error: 'Invalid fields: PIE_ID is required and must be a number.',
            });
        }

        // Check if SENSOR is an array and not empty
        if (!isNonEmptyArray(request.SENSOR)) {
            Logger.error('Invalid SENSOR: ', req.body);
            return res.status(400).json({
                error: 'Invalid fields: SENSOR must be a non-empty array.',
            });
        }

        // Check if CALCULATION is an array and not empty
        if (!isNonEmptyArray(request.CALCULATION)) {
            Logger.error('Invalid CALCULATION: ', req.body);
            return res.status(400).json({
                error: 'Invalid fields: CALCULATION must be a non-empty array.',
            });
        }

        // Check if LOOK_UP_DATE is a valid date
        //Suggested to treat as a unknown, then convert to string, makes it compatiable with Date objects (In theory?)
        if (!isValidDate(request.LOOK_UP_DATE as unknown as string)) {
            Logger.error('Invalid LOOK_UP_DATE: ', req.body);
            return res.status(400).json({
                error: 'Invalid fields: LOOK_UP_DATE is required and must be a valid date.',
            });
        }

        // Check if RANGE_DAYS_BACK is a valid number (positive, can allow zero if needed)
        if (!isValidNumber(request.RANGE_DAYS_BACK, true)) {
            Logger.error('Invalid RANGE_DAYS_BACK: ', req.body);
            return res.status(400).json({
                error: 'Invalid fields: RANGE_DAYS_BACK is required and must be a number.',
            });
        }
    }
}
