module.exports = {
  extends: ['@attest/typescript', '@attest/node'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  overrides: [
    {
      files: ['package.json'],
      rules: {
        'package-json/sort-collections': [
          2,
          [
            'devDependencies',
            'dependencies',
            'peerDependencies',
            'optionalDepedencies',
            'bundledDepednencies',
            'config',
          ],
        ],
      },
    },
  ],
}
