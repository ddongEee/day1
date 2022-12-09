import EnvUtils from "./EnvUtils";
import ErrorUtils from "./ErrorUtils";
import FileUtils from "./FileUtils";

function makePrefix(tag: string = "no-tagged"): string {
  return `      🚀 [${tag}] `;
}

export { EnvUtils, ErrorUtils, FileUtils, makePrefix };
