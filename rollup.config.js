const config = require('@attest/config-rollup-typescript')
const { dependencies: dependenciesOptions } = require('./package.json')

const dependencies = Object.keys(dependenciesOptions)

module.exports = config({
  builds(options) {
    return [
      {
        ...options,
        output: 'dist/index.js',
        format: 'cjs',
      },
    ]
  },
}).map(configuration => {
  const { external = [] } = configuration

  return {
    ...configuration,
    external: external.filter(external => !dependencies.includes(external)),
  }
})
