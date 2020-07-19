module.exports = {
    roots: ['./'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ["**/tests/**/*.spec.+(ts|tsx|js)"],
    // testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
