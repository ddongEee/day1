import * as dotenv from "dotenv";
import * as os from "os";
import { LogLevelNames } from "loglevel";

// Read System Environment Variables
dotenv.config();

const fixedTestExecutionTime = new Date()
  .toISOString()
  .replace(/T/, " ")
  .replace(/\..+/, "");

function readTestExecutionTime(): string {
  return fixedTestExecutionTime;
}

function readTestExecutionOS(): string {
  const platform: string =
    os.platform() === "darwin" ? "Mac OS X" : os.platform();
  return `${platform} - ${os.release()} (${os.arch()})`;
}

function readSystemName(): string {
  return process.env.SYSTEM_NAME ?? "No-titled";
}

function readSystemVersion(): string {
  return process.env.SYSTEM_VERSION ?? "(unknown)";
}

function readSystemRuntime(): string {
  return process.env.SYSTEM_VERSION ?? "(unknown)";
}

function readSystemEndpoint(): string {
  const protocol = process.env.SYSTEM_PROTOCOL ?? "http";
  const host = process.env.SYSTEM_HOST ?? "127.0.0.1";
  const port = process.env.SYSTEM_PORT ?? "8081";
  return `${protocol}://${host}:${port}`;
}

function readLogLevel(): LogLevelNames {
  const logLevel = process.env.LOG_LEVEL ?? "info";
  return logLevel as LogLevelNames;
}

const EnvUtils = {
  readTestExecutionTime,
  readTestExecutionOS,
  readSystemName,
  readSystemVersion,
  readSystemRuntime,
  readSystemEndpoint,
  readLogLevel,
};

export default EnvUtils;
