// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: ["./src/**"],
    coverageReporters: ['html', 'lcov'],
    coverageDirectory: './coverage'

};



export default config;
