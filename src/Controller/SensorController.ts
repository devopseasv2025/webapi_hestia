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
            const range = req.params?.range;

            const result = await this.sensorRepository.readAllSensors(id, range);

            return res.send(result);
        }catch(err){
            Logger.error("Error getting sensor data", err);
            throw err;
        }

    }

}