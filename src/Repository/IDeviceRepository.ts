import {IDevice} from "../models/IDevice";

export interface IDeviceRepository{
    read(id: number, range: number);
    readAllDevices() : Promise<IDevice[]>;
    readDeviceById(id: number) : Promise<IDevice>;
    readDeviceByMacAddress(macAddress: string) : Promise<IDevice>;
}