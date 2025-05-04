import {IDeviceRepository} from "../Repository/IDeviceRepository.js";
import {RegexUtils} from "../Utilities/regexUtils.js";
import Logger from "../Infrastructure/Logger/logger.js";


interface IDeviceController {
    getDeviceByMac(req: any, res: any): Promise<Response>;
    getDeviceById(req: any, res: any): Promise<Response>;
    getDevices(req: any, res: any): Promise<Response>;
}

export default class DeviceController implements IDeviceController {
    private _deviceRepository: IDeviceRepository;

    constructor(deviceRepository: IDeviceRepository) {
        this._deviceRepository = deviceRepository;
        this.getDevices = this.getDevices.bind(this);
        this.getDeviceById = this.getDeviceById.bind(this);
        this.getDeviceByMac = this.getDeviceByMac.bind(this);
    }

    public async getDeviceById(req: any, res: any): Promise<Response> {
        if (!req.params?.id) {
            return res.status(404).send("Id missing required field");
        }

        const device = await this._deviceRepository.readDeviceById(req.params.id);
        return await res.status(200).send(device);

    }

    public async getDeviceByMac(req: any, res: any) {

        if (!req.params?.mac) {
            return res.status(400).send("Device ID is required");
        }

        // Check if the device ID is a valid mac address
        if (!RegexUtils.isValidMacAddress(req.params?.mac)) {
            return res.status(400).send("Invalid Device ID, must be a valid mac address for the device");
        }

        const device = await this._deviceRepository.readDeviceByMacAddress(req.params.mac);
        return await res.status(200).send(device);
    }

    public async getDevices(req: any, res: any): Promise<Response> {

        try {
            const devices = await this._deviceRepository.readAllDevices();

            if (devices.length === 0) {
                return res.status(404).send("No devices found");
            }

            return res.status(200).send(devices);

        } catch (err) {
            Logger.error("Error fetching devices: ", err);
            return res.status(500).send("Internal server error");
        }
    }

}

