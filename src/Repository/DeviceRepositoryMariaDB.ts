import {IDeviceRepository} from "./IDeviceRepository.js";
import {asyncFunction} from "../Service/Database.js";
import {IDevice} from "../Entities/Interfaces/IDevice";

export class DeviceRepositoryMariaDB implements IDeviceRepository {

    read(id: number, range: number) {
        throw new Error("Method not implemented.");
    }

    async readAllDevices() : Promise<IDevice[]>  {
        return await asyncFunction<IDevice[]>("SELECT * FROM deviceDB.devices")
    }

    async readDeviceById(id: number) : Promise<IDevice> {
        return await asyncFunction<IDevice>("SELECT * FROM deviceDB.devices WHERE PIE_ID = ?", [id])
    }

    async readDeviceByMacAddress(macAddress: string) : Promise<IDevice> {
        return await asyncFunction<IDevice>("SELECT * FROM deviceDB.devices WHERE MAC = ?", [macAddress])
    }

}