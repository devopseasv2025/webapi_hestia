import {validateNumberArray} from "../Utilities/validateData.js";

export class AnalyticsServices {

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

