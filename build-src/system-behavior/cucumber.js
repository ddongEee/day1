// Cucumber Profiles - Ref. https://github.com/cucumber/cucumber-js/blob/main/docs/profiles.md#profiles
const commonOptions = [
  // Set all features
  'features/**/*.feature',
  // Load 'TypeScript module' & 'Step Definitions'
  '--require-module ts-node/register',
  "--require cucumber.setup.js",
  '--require step_definitions/**/*.ts',
  '--require utils/**/*.ts',
  // Disable publishing option
  '--publish-quiet',
];

const consoleOutput = [
  ...commonOptions,
  '--format progress-bar',
  '--format @cucumber/pretty-formatter',
];

const outputHome = "outputs/"
const outputFile = `${outputHome}/basic/cucumber-report`
const fileOutput = [
  ...commonOptions,
  '--format progress-bar',
  `--format json:${outputFile}.json`,
  `--format html:${outputFile}.html`,
];

module.exports = {
  console: consoleOutput.join(' '),
  report: fileOutput.join(' '),
};
