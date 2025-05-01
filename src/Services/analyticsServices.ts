import {validateNumberArray} from "../Utilities/validateData";
import {iCalculationRequest} from "../Entities/Interfaces/iRequests";
import {getSensorDataOnly} from "../Repository/memoryDeviceRepository";

export default class AnalyticsServices {
    constructor(request: iCalculationRequest) {
        let temprepo = getSensorDataOnly();
        // Constructor logic if needed
    }

    sum(numbers: number[]): number {
        validateNumberArray(numbers)

        return numbers.reduce((acc, val) => acc + val, 0);
    }

    average(numbers: number[]): number {
        validateNumberArray(numbers)

        return this.sum(numbers) / numbers.length;
    }

    min(numbers: number[]): number {
        validateNumberArray(numbers)

        return Math.min(...numbers);
    }

    max(numbers: number[]): number {
        validateNumberArray(numbers)

        return Math.max(...numbers);
    }

    count(numbers: number[]): number {
        validateNumberArray(numbers)

        return numbers.length;
    }
}

