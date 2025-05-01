
export interface IDeviceRepository{
    read(id: number, startDate: Date, range: number);
}