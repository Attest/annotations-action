module.exports = {
  '*.@(css|html|js|json|less|md|scss|ts|vue|yaml|yml)': [
    'yarn prettier --ignore-path .lintignore --write',
  ],
  '*.@(md|js|jsx|ts|tsx|json)': [
    'yarn eslint --ext md,tsx,ts,js,ts,json --ignore-path .lintignore --fix',
  ],
  'package.json': ['yarn codeowners'],
}
