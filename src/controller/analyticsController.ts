import Logger from "../Infrastructure/Logger/logger";
import express from "express";
import {iCalculationRequest} from "../Entities/Interfaces/iRequests";
import {error} from "winston";
import {isNonEmptyArray, isValidDate, isValidNumber} from "../Utilities/validateData";

export async function analyticsControllerNumbers (req: express.Request, res: express.Response) {
    const request = req.body as iCalculationRequest;

    //#region Validate Request
    // Check if PIE_ID is a valid number
    if (!isValidNumber(request.PIE_ID)) {
        Logger.error('Invalid PIE_ID: ', req.body);
        return res.status(400).json({
            error: 'Invalid fields: PIE_ID is required and must be a number.',
        });
    }

    // Check if SENSOR is an array and not empty
    if (!isNonEmptyArray(request.SENSOR)) {
        Logger.error('Invalid SENSOR: ', req.body);
        return res.status(400).json({
            error: 'Invalid fields: SENSOR must be a non-empty array.',
        });
    }

    // Check if CALCULATION is an array and not empty
    if (!isNonEmptyArray(request.CALCULATION)) {
        Logger.error('Invalid CALCULATION: ', req.body);
        return res.status(400).json({
            error: 'Invalid fields: CALCULATION must be a non-empty array.',
        });
    }

    // Check if LOOK_UP_DATE is a valid date
    //Suggested to treat as a unknown, then convert to string, makes it compatiable with Date objects (In theory?)
    if (!isValidDate(request.LOOK_UP_DATE as unknown as string)) {
        Logger.error('Invalid LOOK_UP_DATE: ', req.body);
        return res.status(400).json({
            error: 'Invalid fields: LOOK_UP_DATE is required and must be a valid date.',
        });
    }

    // Check if RANGE_DAYS_BACK is a valid number (positive, can allow zero if needed)
    if (!isValidNumber(request.RANGE_DAYS_BACK, true)) {
        Logger.error('Invalid RANGE_DAYS_BACK: ', req.body);
        return res.status(400).json({
            error: 'Invalid fields: RANGE_DAYS_BACK is required and must be a number.',
        });
    }
    //#endregion



    // Valid request
}
