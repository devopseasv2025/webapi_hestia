import {validateNumberArray} from "../Utilities/validateData";

export function sum(numbers: number[]): number {
    validateNumberArray(numbers)

    return numbers.reduce((acc, val) => acc + val, 0);
}

export function average(numbers: number[]): number {
    validateNumberArray(numbers)

    return sum(numbers) / numbers.length;
}

export function min(numbers: number[]): number {
    validateNumberArray(numbers)

    return Math.min(...numbers);
}

export function max(numbers: number[]): number {
    validateNumberArray(numbers)

    return Math.max(...numbers);
}

export function count(numbers: number[]): number {
    validateNumberArray(numbers)

    return numbers.length;
}

