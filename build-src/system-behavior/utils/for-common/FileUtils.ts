import * as fs from "fs";

import ErrorUtils from "./ErrorUtils";

function readDefaultReqHeader(): object {
  return readJsonFile("./fixtures/default/request-header.json");
}

function readDefaultReqBody(): object {
  return readJsonFile("./fixtures/default/request-body.json");
}

function readJsonFile(jsonFilePath: string): object {
  if (jsonFilePath.startsWith("./")) {
    return JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
  }
  throw ErrorUtils.invalidInput(
    "JSON File Path",
    `must start with "./" (your input: "${jsonFilePath}")`
  );
}

const FileUtils = {
  readDefaultReqHeader,
  readDefaultReqBody,
  readJsonFile,
};

export default FileUtils;
