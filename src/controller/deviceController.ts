import {RegexUtils} from "../utils/regexUtils.js";

interface IDeviceController {
    getDeviceByMac(req: any, res: any): Response;
    getDeviceById(req: any, res: any): Response;
    getDevices(req: any, res: any): Response;
}

export default class DeviceController implements IDeviceController {

    public getDeviceById(req: any, res: any): Response {
        if (!req.params.id) {
            return res.status(404).send("Id missing required field");
        }

        return res.status(200).send("[TEMP] Device returned with id " + req.params.id);

    }

    public getDeviceByMac(req: any, res: any) {

        if (!req.params?.mac) {
            return res.status(400).send("Device ID is required");
        }

        // Check if the device ID is a valid mac address
        if (!RegexUtils.isValidMacAddress(req.params?.mac)) {
            return res.status(400).send("Invalid Device ID, must be a valid mac address for the device");
        }

        return res.send("Welcome to the device controller");
    }

    public getDevices(req: any, res: any) {
       return res.send("Welcome to the devices controller");
    }

}

