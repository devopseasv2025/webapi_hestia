import { Request, Response } from "express";
import { SensorRepository } from "../Repository/SensorRepository";
import Logger from "../Infrastructure/Logger/logger";

export class SensorController{

    private sensorRepository: SensorRepository = new SensorRepository();

    constructor() {

    }

    // @ts-ignore
    public async getSensorData(req: Request, res: Response): Promise<Response> {

        try{
            const id = req.params?.id;

            const result = await this.sensorRepository.readAllSensors(req.query.id, req.query.range);

            return res.send(result);
        }catch(err){
            Logger.error("Error getting sensor data", err);
            throw err;
        }

    }

}