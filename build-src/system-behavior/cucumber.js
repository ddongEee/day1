/* Cucumber Profiles */
const commonOptions = [
  // Set all features
  'features/**/*.feature',
  // Load 'TypeScript module' & 'Step Definitions'
  '--require-module ts-node/register',
  '--require step_definitions/**/*.ts',
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
