import core from '@actions/core'

export interface EnviromentOptions {
  token: string
  title: string
  path: string
}

export function getInputs(): EnviromentOptions {
  const token = core.getInput('token')
  const path = core.getInput('path')
  const title = core.getInput('title')

  return validateEnvironmentOptions({ token, path, title })
}

function validateEnvironmentOptions<E extends EnviromentOptions>(
  environment: Partial<EnviromentOptions>,
): E {
  if (!environment.token) {
    throw new Error('`token` input must be set.')
  }

  if (!environment.path) {
    throw new Error('`path` input must be set.')
  }

  if (!environment.title) {
    throw new Error('`title` input must be set')
  }

  return environment as E
}
