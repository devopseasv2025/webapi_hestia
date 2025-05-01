export interface iSensorData {
    ID: number,
    PIE_ID: number,
    TEMP: number,
    AIR_HUMID: number,
    PPM: number,
    SOIL_MOISTURE: number,
    PRESSURE: Number,
    DATE: Date,
}

export interface iDaoRawSensorData {
    TEMP: number,
    AIR_HUMID: number,
    PPM: number,
    SOIL_MOISTURE: number
}