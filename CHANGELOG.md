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
