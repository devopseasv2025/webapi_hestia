import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import cookieParser from 'cookie-parser';
import Logger from "./Infrastructure/Logger/logger.js";
import {deviceRoutes} from "./Routes/deviceRoutes.js";
import {analyticsRoutes} from "./Routes/analyticsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

///default:development.dca6bcd5e0482d017d0b7ad1c20923961fac5cffe23518cc0b82cf45

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use('/api/devices/', deviceRoutes);
app.use('/api/analytics/', analyticsRoutes);

const server = app.listen(PORT, () =>{
    Logger.info("Server service has started on port: " + PORT);
})