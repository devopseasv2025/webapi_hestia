
export interface IDeviceRepository{
    read(id: number, range: number);
    readAllDevices();
    readDeviceById(id: number);
    readDeviceByMacAddress(macAddress: string);
}