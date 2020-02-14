## [1.0.3](https://github.com/Attest/annotations-action/compare/v1.0.2...v1.0.3) (2020-02-14)

### Bug Fix - add missing dist file

add dist/index.js that we can distribute the action

Reference: [421fd9f](https://github.com/Attest/annotations-action/commit/421fd9f)
Ticket: [ch8743](https://app.clubhouse.io/attest/story/8743)

## [1.0.2](https://github.com/Attest/annotations-action/compare/v1.0.1...v1.0.2) (2020-02-13)

### Bug Fix - github release assets
Reference: [fcee803](https://github.com/Attest/annotations-action/commit/fcee803)
Ticket: [ch8743](https://app.clubhouse.io/attest/story/8743)

## [1.0.1](https://github.com/Attest/annotations-action/compare/v1.0.0...v1.0.1) (2020-02-13)

### Bug Fix - bundle dependencies

remove dependecies for external so that they are compiled into the dist

Reference: [bd3ad1e](https://github.com/Attest/annotations-action/commit/bd3ad1e)
Ticket: [ch8743](https://app.clubhouse.io/attest/story/8743)

### Bug Fix - update included assets

- include node_modules in release archive (required for github actions)

Reference: [542f756](https://github.com/Attest/annotations-action/commit/542f756)
Ticket: [ch8743](https://app.clubhouse.io/attest/story/8743)


### Continuous Integration - correct branding

correct branding in action.yml

Reference: [f3f4ea0](https://github.com/Attest/annotations-action/commit/f3f4ea0)
Ticket: [ch8743](https://app.clubhouse.io/attest/story/8743)

# 1.0.0 (2020-02-13)

### Build System - update all dependencies

- update all dependencies to the latest versions
- fix issues with types with `@octokit/rest`
- update dependabot to use `build` for the prefix as `chore` is no
longer valid

Reference: [83eaa9c](https://github.com/Attest/annotations-action/commit/83eaa9c)
Ticket: [ch8743](https://app.clubhouse.io/attest/story/8743)


### Continuous Integration - update pipelines

- simplify master pipeline; and ensure that we add the correct remote (use
env var)
- add dependency audit check

Reference: [695c1e5](https://github.com/Attest/annotations-action/commit/695c1e5)
Ticket: [ch8743](https://app.clubhouse.io/attest/story/8743)

### Continuous Integration - remove dry run mode

run real release cycle

Reference: [952e10e](https://github.com/Attest/annotations-action/commit/952e10e)
Ticket: [ch8743](https://app.clubhouse.io/attest/story/8743)

### Continuous Integration - use config property

use config property over preset; preset will not resolve the module but attempt to use one of the standard presets available

Reference: [593f33e](https://github.com/Attest/annotations-action/commit/593f33e)
Ticket: [ch8743](https://app.clubhouse.io/attest/story/8743)


### Feature - add action logic

- create logic for writing annotations from a given json file
- add action.yml
- add example into workflow

Reference: [0fc4fb8](https://github.com/Attest/annotations-action/commit/0fc4fb8)
Ticket: [ch8753](https://app.clubhouse.io/attest/story/8753)


###  - setup

Create base repository adding the following tooling:

- eslint
- prettier
- rollup
- typescript
- github workflows
- semantic-release (in dry run mode)
- commit lint
- lintstaged + husky
- gitignore
- dependabot

Reference: [12281b2](https://github.com/Attest/annotations-action/commit/12281b2)
Ticket: [ch8753](https://app.clubhouse.io/attest/story/8753)

###  - init
Reference: [21b51d6](https://github.com/Attest/annotations-action/commit/21b51d6)
