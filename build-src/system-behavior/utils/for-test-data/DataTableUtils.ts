import dotenv from "dotenv";
import { DataTable } from "@cucumber/cucumber";
import { ErrorUtils } from "#utils/for-common";

dotenv.config();

export enum DataTableHeaders {
  Key = "Key",
  Name = "Name",
  Type = "Type",
  Value = "Value",
}

export enum DataTableTypes {
  ENV = "ENV",
  NUM = "NUM",
  SET = "SET",
  STR = "STR",
}

function convertToArray(jsonObj: object): object[] {
  const arr = new Array<object>();
  for (const key in jsonObj) {
    try {
      const index = Number(key);
      arr[index] = jsonObj[index];
    } catch (e) {
      throw ErrorUtils.invalidInput(
        key,
        `Check the key is numeric to use an index. (jsonObj: "${JSON.stringify(
          jsonObj
        )}")`
      );
    }
  }
  return JSON.parse(JSON.stringify(arr));
}

function convertToJson(dataTable: DataTable, dataTableName: string): object {
  const jsonObj = {};
  getDataTableHash(dataTable, dataTableName).forEach((row) => {
    const propKey: string = row[DataTableHeaders.Key];
    const propType: string = row[DataTableHeaders.Type];
    const propValue: string = row[DataTableHeaders.Value];
    jsonObj[`${propKey}`] = valueFactoryFromCell(propType, propValue);
  });
  return jsonObj;
}

function getDataTableHash(dataTable: DataTable, dataTableName: string): any[] {
  const dataTableRecord = dataTable.hashes();
  if (dataTableRecord.length < 1) {
    throw ErrorUtils.nonExistingDataTable(dataTableName);
  }
  return dataTableRecord;
}

function valueFactoryFromCell(
  cellType: string,
  cellValue: string
): { [key: string]: object } | string {
  let ejectedValue;
  switch (cellType) {
    case DataTableTypes.ENV:
      ejectedValue =
        process.env[cellValue] !== "" ? process.env[cellValue] : null;
      break;

    case DataTableTypes.NUM:
      if (Number.isNaN(cellValue)) {
        throw ErrorUtils.invalidInput(cellValue, cellType);
      }
      ejectedValue = parseInt(cellValue.replace('"', ""), 10);
      break;

    case DataTableTypes.STR:
      ejectedValue = cellValue.replace('"', "");
      break;

    case DataTableTypes.SET:
      if (cellValue.startsWith("{")) {
        ejectedValue = JSON.parse(cellValue);
        break;
      }
      throw ErrorUtils.invalidInput(
        cellValue,
        `${cellType} (must be like - {key: value}`
      );

    default:
      throw new Error(`No implementation for this type: ${cellType}`);
  }

  if (cellType !== DataTableTypes.NUM && ejectedValue === null) {
    throw new Error(
      `Fail to allocate ${cellType}. You need to set 'ENV' with command: 'export ${cellValue}="VALID_VALUE"`
    );
  }
  return ejectedValue;
}

export {
  convertToArray,
  convertToJson,
  getDataTableHash,
  valueFactoryFromCell,
};
