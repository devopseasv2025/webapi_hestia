import {IDeviceRepository} from "./IDeviceRepository.js";
import {IDevice} from "../models/IDevice";

export class DeviceRepository implements IDeviceRepository {
    readAllDevices() : Promise<IDevice[]> {
        throw new Error("Method not implemented.");
    }
    readDeviceById(id: number) : Promise<IDevice> {
        throw new Error("Method not implemented.");
    }
    readDeviceByMacAddress(macAddress: string) : Promise<IDevice> {
        throw new Error("Method not implemented.");
    }
    read(id: number, range: number) : Promise<IDevice> {
        throw new Error("Method not implemented.");
    }


}