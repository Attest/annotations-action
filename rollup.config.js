const config = require('@attest/config-rollup-typescript')
const { dependencies: dependenciesOptions } = require('./package.json')

const dependencies = Object.keys(dependenciesOptions)

module.exports = config().map(configuration => {
  const { external = [] } = configuration

  return {
    ...configuration,
    external: external.filter(external => !dependencies.includes(external)),
  }
})
