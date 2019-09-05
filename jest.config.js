module.exports = {
  transform: {
    "^.+\\.js$": ["babel-jest"],
    "^.+\\.svelte$": "jest-transform-svelte"
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "@testing-library/svelte/cleanup-after-each"
  ],
  modulePaths: ["<rootDir>/app/javascript/src"],
  testMatch: ["<rootDir>/spec/javascript/**/*.test.js"]
}
