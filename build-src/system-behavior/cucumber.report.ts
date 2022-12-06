// Ref. https://github.com/wswebcreation/multiple-cucumber-html-reporter#readme
import * as report from "multiple-cucumber-html-reporter";

import { EnvUtils } from "./utils/for-common";

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
  pageTitle: `BDD Report - ${EnvUtils.readSystemName()}`,
  reportName: `${EnvUtils.readSystemName()} / Automated BDD-Test Result`,
  // etc
  customData: {
    title: EnvUtils.readSystemName(),
    data: [
      {
        label: "Report Generation Time",
        value: EnvUtils.readTestExecutionTime(),
      },
      { label: "BDD Test Execution OS", value: EnvUtils.readTestExecutionOS() },
      { label: "System Version", value: EnvUtils.readSystemVersion() },
      { label: "System Runtime", value: EnvUtils.readSystemRuntime() },
      { label: "System Endpoint", value: EnvUtils.readSystemEndpoint() },
    ],
  },
  customMetadata: true,
  metadata: [
    // {name: "column-head", value: "value"},
  ],
};

// Generate Report
report.generate(reportOption);
