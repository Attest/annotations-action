# Annotations Action

GitHub action for creating annotations from JSON file

## Note

This repository uses npm packages from `@attest` scope on github; we are working hard to open source these packages.

## 🔥 Getting started

Make sure you have a `~/.npmrc` file setup with a [github token](https://github.com/settings/tokens/new) (read packages scope) to authenticate with the Github package registry for [fe-tools](https://github.com/Attest/fe-tools/packages)

```
//npm.pkg.github.com/:_authToken={githubtoken}
@attest:registry=https://npm.pkg.github.com/
```

Then install with

```
yarn
```

## Example workflow

`workflow.yml`

```
name: workflow
on: [push]
jobs:
  job:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v1
      - name: Annotate
        uses: Attest/annotations-action@v0.1.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          input: './annotations.json'
          title: 'Annotate Files'
```

### Input file structure

The expected structure for the input is defined [here in the source](https://github.com/Attest/annotations-action/blob/master/src/annotation.ts), for an example please look at [`annotations.json`](https://github.com/Attest/annotations-action/blob/master/annotations.json).
