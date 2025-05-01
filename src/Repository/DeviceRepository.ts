import {IDeviceRepository} from "./IDeviceRepository.js";

export class DeviceRepository implements IDeviceRepository {
    read(id: number, startDate: Date, range: number) {
        throw new Error("Method not implemented.");
    }


}