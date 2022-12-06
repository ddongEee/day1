import { ErrorUtils } from "#utils/for-common";

const filterQuotations = (originStr: string, type: string): string => {
  if (originStr === "") {
    throw ErrorUtils.invalidInput(originStr, type);
  }
  return originStr
    .replace(/"/g, "") // Remove all double quote (")
    .replace(/'/g, ""); // Remove all single quote (')
};

export { filterQuotations };
