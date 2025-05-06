export default {
    mutate: [
        "src/**/*.ts",
        "!src/**/launch.ts",
    ],
    testRunner: "jest",
    coverageAnalysis: "perTest",
    reporters: ["html", "clear-text", "progress"],
    jest: {
        projectType: "custom",
        configFile: "jest.config.ts",
        enableFindRelatedTests: true
    }
}