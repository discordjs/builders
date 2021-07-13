/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	testMatch: ['<rootDir>/tests/**/*.test.ts'],
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.ts'],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'clover'],
	coverageThreshold: {
		global: {
			branches: 70,
			lines: 70,
			statements: 70,
		},
	},
	coveragePathIgnorePatterns: ['src/index.ts'],
};
