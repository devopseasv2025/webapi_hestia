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

function validateNumberArray (numbers: number[]) {
    if (!Array.isArray(numbers)) {
        throw new Error('Input is not an array');
    }

    if (numbers.some(n => typeof n !== 'number' || isNaN(n))) {
        throw new Error('Array contains non-numeric values');
    }

    if (numbers.length === 0) {
        throw new Error('Array is empty');
    }
}
