import express, {request, response} from 'express';

function analyseNumbers(numbers: any) {
    
}

export function analyticsController (req: express.Request, res: express.Response) {
    const numbers = req.body;

    if (!numbers || !numbers.length) {
        res.status(400).json({ error:'Expecting Numbers'})
    }

    const result = analyseNumbers(numbers);
}