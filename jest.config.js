module.exports = {
  setupFiles: ['<rootDir>/tests/test-utils/jest.setup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  moduleFileExtensions: ['js', 'json', 'vue']
}
