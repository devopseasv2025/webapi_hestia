import {IDeviceRepository} from "./IDeviceRepository.js";
import {asyncFunction} from "../Service/Database.js";
import {Device} from "../models/Device";

export class DeviceRepositoryMariaDB implements IDeviceRepository {

    read(id: number, range: number) {
        throw new Error("Method not implemented.");
    }

    async readAllDevices() {
        return await asyncFunction<Device>("SELECT * FROM devices")
    }

    async readDeviceById(id: number) {
        return await asyncFunction<Device>("SELECT * FROM devices WHERE PIE_ID = ?", [id])
    }

    async readDeviceByMacAddress(macAddress: string) {
        return await asyncFunction<Device>("SELECT * FROM devices WHERE MAC = ?", [macAddress])
    }

}