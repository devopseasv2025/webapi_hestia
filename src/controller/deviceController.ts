import {RegexUtils} from "../utils/regexUtils";

interface IDeviceController {
    getDevice(req: any, res: any): Response;
    getDevices(req: any, res: any): Response;
}

export default class DeviceController implements IDeviceController {

    public getDevice(req: any, res: any) {

        if (!req.params.id) {
            return res.status(400).send("Device ID is required");
        }

        // Check if the device ID is a valid mac address
        if (RegexUtils.isValidMacAddress(req.params?.macAddress)) {
            return res.status(400).send("Invalid Device ID, must be a valid mac address for the device");
        }

        return res.send("Welcome to the device controller");
    }

    public getDevices(req: any, res: any) {
       return res.send("Welcome to the devices controller");
    }

}

