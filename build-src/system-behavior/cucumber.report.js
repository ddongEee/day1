// Ref. https://github.com/wswebcreation/multiple-cucumber-html-reporter#readme
const report = require('multiple-cucumber-html-reporter');
const os = require('os');
const dotenv = require('dotenv');

// Read System Environment Variables
dotenv.config();

// Custom Data with Environment Variables
const reportGenerationTime = new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');

const testExecutionOs =
    `${os.platform() === 'darwin' ? 'Mac OS X'
        : os.platform()} ${os.release()} (${os.arch()})`;

const systemVersion = process.env.SYSTEM_VERSION;
const systemRuntime = process.env.SYSTEM_RUNTIME;
const systemEndpoint = `${process.env.SYSTEM_PROTOCOL}://${process.env.SYSTEM_HOST}:${process.env.SYSTEM_PORT}`;

// Report Option
const reportOption = {
  theme: "bootstrap",
  // File
  jsonDir: "outputs/basic/",
  reportPath: "outputs/report/",
  screenshotsDirectory: "output/screenshots/",
  openReportInBrowser: true,
  // Time
  displayDuration: true,
  durationInMS: true,
  // HTML
  pageTitle: "BDD HTML Report - by. AWS ProServe Korea",
  reportName: "AWS ProServe Korea",
  // etc
  customData: {
    title: 'ukids/kids_lms_play_poc (Phase2)',
    data: [
      {label: 'Report Generation Time', value: reportGenerationTime},
      {label: 'BDD Test Execution OS', value: testExecutionOs},
      {label: 'System Version', value: systemVersion},
      {label: 'System Runtime', value: systemRuntime},
      {label: 'System Endpoint', value: systemEndpoint},
    ]
  },
  customMetadata: true,
  metadata: [
    // {name: "column-head", value: "value"},
  ],
};
// console.log("\nreportOption.customData.data:");
// console.log(reportOption.customData.data);

// Generate Report
report.generate(reportOption);
