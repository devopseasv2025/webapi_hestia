export default {
    mutate: [
        "src/**/*.ts",
        "!src/**/launch.ts",
        "!src/Controller/*.ts",
        "!src/Routes/*.ts",
        "!src/Repository/*.ts",
        "!src/Infrastructure/**/*.ts",
        "!src/Service/MariaDBService.ts"
    ],
    thresholds: {
        high: 90,
        low: 80,
        break: 80
    },
    testRunner: "jest",
    coverageAnalysis: "perTest",
    reporters: ["html", "clear-text", "progress"],
    jest: {
        projectType: "custom",
        configFile: "jest.config.js",
        enableFindRelatedTests: true
    }
}