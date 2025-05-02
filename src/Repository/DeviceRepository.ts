import {IDeviceRepository} from "./IDeviceRepository.js";

export class DeviceRepository implements IDeviceRepository {
    readAllDevices() {
        throw new Error("Method not implemented.");
    }
    readDeviceById(id: number) {
        throw new Error("Method not implemented.");
    }
    readDeviceByMacAddress(macAddress: string) {
        throw new Error("Method not implemented.");
    }
    read(id: number, range: number) {
        throw new Error("Method not implemented.");
    }


}