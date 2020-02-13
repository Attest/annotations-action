module.exports = {
  release: {
    branches: ['master'],
  },
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/release-notes-generator',
      {
        config: '@attest/conventional-changelog',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        config: '@attest/conventional-changelog',
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: ['dist/**', 'package.json', 'action.yml', 'LICENSE.md'],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md'],
      },
    ],
  ],
}
