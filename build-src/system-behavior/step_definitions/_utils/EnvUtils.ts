const os = require("os");

// Read System Environment Variables
require("dotenv").config();

const fixedTestExecutionTime = new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
const readTestExecutionTime = (): string => fixedTestExecutionTime;

const readTestExecutionOS = (): string => {
  const platform = (os.platform() === 'darwin') ? 'Mac OS X' : os.platform();
  return `${platform} - ${os.release()} (${os.arch()})`;
}

const readSystemName = (): string => process.env.SYSTEM_NAME ?? "No-titled";

const readSystemVersion = (): string => process.env.SYSTEM_VERSION ?? "(unknown)";

const readSystemRuntime = (): string => process.env.SYSTEM_VERSION ?? "(unknown)";

const readSystemEndpoint = (): string => {
  const protocol = process.env.SYSTEM_PROTOCOL ?? "http";
  const host = process.env.SYSTEM_HOST ?? "localhost";
  const port = process.env.SYSTEM_PORT ?? "8080";
  return `${protocol}://${host}:${port}`;
}

const EnvUtils = {
  readTestExecutionTime,
  readTestExecutionOS,
  readSystemName,
  readSystemVersion,
  readSystemRuntime,
  readSystemEndpoint,
}

export default EnvUtils;
