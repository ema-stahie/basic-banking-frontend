module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
      "^react-router-dom$": "<rootDir>/node_modules/react-router-dom"
    },
    testEnvironment: "jsdom"
  };