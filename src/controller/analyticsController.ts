import express, {request, response} from 'express';
import {average} from "../Services/analyticsServices";

export function analyticsController (req: express.Request, res: express.Response) {
    const numbers = req.body;

    if (!numbers || !numbers.length) {
        res.status(400).json({ error:'Expecting Numbers'})
    }

    const result = average(numbers);
    console.log(result);
}