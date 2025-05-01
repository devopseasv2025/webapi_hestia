import express, {request, response} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import cookieParser from 'cookie-parser';
import Logger from "./Infrastructure/Logger/logger.js";
import {deviceRoutes} from "./Routes/Devices/deviceRoutes.js";
import {analyticsController} from "./controller/analyticsController";
import {getSensorDataOnly} from "./Repository/memoryDeviceRepository";
import {availableParallelism} from "node:os";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use('/api/devices/', deviceRoutes);


const server = app.listen(PORT, () =>{
    Logger.info("Server service has started on port: " + PORT);


    const array = getSensorDataOnly()
    console.log(array)

    analyticsController(request, response)
})

