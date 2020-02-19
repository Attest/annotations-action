const config = require('@attest/config-rollup-typescript')
const { dependencies: packageDependencies } = require('./package.json')

const dependencies = Object.keys(packageDependencies)

module.exports = config().map(configuration => {
  const external = configuration.external.filter(dependency => !dependencies.includes(dependency))

  return { ...configuration, external }
})
