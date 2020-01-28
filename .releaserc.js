module.exports = {
  release: {
    branches: ['master'],
  },
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/release-notes-generator',
      {
        preset: '@attest/conventional-changelog',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        preset: '@attest/conventional-changelog',
        changelogFile: 'CHANGELOG.md',
      },
    ],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'dist/**'],
      },
    ],
  ],
}
