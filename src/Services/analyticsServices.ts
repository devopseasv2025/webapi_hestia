export function analyseNumbers(numbers: number[]) {

    return {
        min: 0,
        max: 0,
        avg: 0,

    };
}

export function average(numbers: number[]) {
    return numbers.reduce((acc, val) => acc + val, 0);
}