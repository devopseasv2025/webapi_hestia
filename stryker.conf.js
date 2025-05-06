export default {
    mutate: [
        "src/**/*.ts",
        "!src/**/launch.ts",
        "!src/Controller/*.ts",
        "!src/Routes/*.ts",
        "!src/Repository/*.ts",
        "!src/Infrastructure/**/*.ts",
    ],
    thresholds: {
        break: 80
    },
    testRunner: "jest",
    coverageAnalysis: "perTest",
    reporters: ["html", "clear-text", "progress"],
    jest: {
        projectType: "custom",
        configFile: "jest.config.ts",
        enableFindRelatedTests: true
    }
}