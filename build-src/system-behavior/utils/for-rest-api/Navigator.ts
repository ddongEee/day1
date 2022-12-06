import pactum from "pactum";

import { ErrorUtils } from "../for-common";
import { HttpMethod } from "./specs/HttpMethod";
import RestApiTestSpecs, {
  DimenJson,
  DimenMap,
  PlainJson,
  PlainMap,
  PlainValue,
} from "./specs/RestApiTestSpecs";

export default class Navigator implements RestApiTestSpecs {
  // HTTP Method
  private _reqMethod: HttpMethod = HttpMethod.GET;

  get reqMethod(): string {
    return this._reqMethod;
  }

  set reqMethod(inputReqMethod: string) {
    switch (inputReqMethod.toUpperCase()) {
      case HttpMethod.GET:
      case HttpMethod.POST:
      case HttpMethod.PUT:
      case HttpMethod.DELETE:
        this._reqMethod = inputReqMethod as HttpMethod;
        return;
    }
    throw ErrorUtils.invalidInput(
      "http method",
      `ont of these(${JSON.stringify(HttpMethod)})`
    );
  }

  // Server URL
  private _serverUrl: string = "";

  get serverUrl(): string {
    return this._serverUrl !== "" ? this._serverUrl : "";
  }

  set serverUrl(inputServerUrl) {
    const isValidServerUrl =
      inputServerUrl.startsWith("http://") ||
      inputServerUrl.startsWith("https://");
    if (isValidServerUrl) {
      this._serverUrl = inputServerUrl;
      return;
    }
    throw ErrorUtils.invalidInput(
      "server url",
      "Start with 'http://' or 'https://' for url"
    );
  }

  // Path
  private _reqPath: string = "/";

  get reqPath(): string {
    return this._reqPath !== "" ? this._reqPath : "INVALID_PATH_SAVED";
  }

  set reqPath(inputReqPath: string) {
    if (inputReqPath !== "" && inputReqPath.startsWith("/")) {
      this._reqPath = inputReqPath;
      return;
    }
    throw ErrorUtils.invalidInput("path", "string");
  }

  // Path Parameters
  private _reqPathParameters: PlainMap = new Map();

  get reqPathParameters(): PlainJson {
    return Object.fromEntries(this._reqPathParameters);
  }

  set reqPathParameters(inputObj: PlainJson) {
    if (JSON.stringify(inputObj) === "{}") {
      throw ErrorUtils.invalidInput(
        "path parameters",
        "{ [key: string]: string | number | boolean }"
      );
    }
    this._reqPathParameters.clear();
    Object.keys(inputObj).map((key) =>
      this._reqPathParameters.set(key, inputObj[key])
    );
  }

  public appendPathParameter(
    pathParamKey: string,
    pathParamValue: PlainValue
  ): void {
    this._reqPathParameters.set(pathParamKey, pathParamValue.toString());
  }

  // Query Parameters
  private _reqQueryParameters: PlainMap = new Map();

  get reqQueryParams(): PlainJson {
    return Object.fromEntries(this._reqQueryParameters);
  }

  set reqQueryParams(inputObj: PlainJson) {
    if (JSON.stringify(inputObj) === "{}") {
      throw ErrorUtils.invalidInput(
        "query parameters",
        "{ [key: string]: string | number | boolean }"
      );
    }
    this._reqQueryParameters.clear();
    Object.keys(inputObj).map((key) =>
      this._reqQueryParameters.set(key, inputObj[key])
    );
  }

  public appendQueryParameter(
    queryParamKey: string,
    queryParamValue: PlainValue
  ): void {
    this._reqQueryParameters.set(queryParamKey, queryParamValue.toString());
  }

  // Headers
  private _reqHeaders: PlainMap = new Map();

  get reqHeaders(): PlainJson {
    return Object.fromEntries(this._reqHeaders);
  }

  set reqHeaders(inputObj: PlainJson) {
    if (JSON.stringify(inputObj) === "{}") {
      throw ErrorUtils.invalidInput(
        "headers",
        "{ [key: string]: string | number | boolean }"
      );
    }
    this._reqHeaders.clear();
    Object.keys(inputObj).map((key) =>
      this._reqHeaders.set(key, inputObj[key])
    );
  }

  public appendHeader(headerKey: string, headerValue: PlainValue): void {
    this._reqHeaders.set(headerKey, headerValue.toString());
  }

  // Body: json payload
  private _reqBody: DimenMap = new Map();

  get reqBody(): DimenJson {
    return Object.fromEntries(this._reqBody);
  }

  set reqBody(inputObj: DimenJson) {
    if (JSON.stringify(inputObj) === "{}") {
      throw ErrorUtils.invalidInput(
        "body",
        "{ [key: string]: string | number | boolean | set }"
      );
    }
    this._reqBody.clear();
    Object.keys(inputObj).map((key) => this._reqBody.set(key, inputObj[key]));
  }

  public appendBody(bodyKey: string, bodyValue: PlainJson | PlainValue) {
    this._reqBody.set(bodyKey, bodyValue);
  }

  // Call API with contained spec using pactum
  private _callApiSpec: any;

  navigate() {
    if (!this._isCalled) {
      this._callApiSpec = pactum.spec();
      // Set method spec
      const serverEndpoint = [this._serverUrl, this._reqPath].join("");
      switch (this.reqMethod) {
        case HttpMethod.GET:
          this._callApiSpec.get(serverEndpoint);
          break;
        case HttpMethod.POST:
          this._callApiSpec.post(serverEndpoint);
          break;
        case HttpMethod.PUT:
          this._callApiSpec.put(serverEndpoint);
          break;
        case HttpMethod.DELETE:
          this._callApiSpec.delete(serverEndpoint);
          break;
      }
      // Set headers spec
      if (Object.keys(this.reqHeaders).length > 0) {
        this._callApiSpec.withHeaders(this.reqHeaders);
      }
      // Set path parameters
      if (Object.keys(this.reqPathParameters).length > 0) {
        this._callApiSpec.withPathParams(this.reqPathParameters);
      }
      // Set query parameters
      if (Object.keys(this.reqQueryParams).length > 0) {
        this._callApiSpec.withQueryParamss(this.reqQueryParams);
      }
      // Set body payload
      if (Object.keys(this.reqBody).length > 0) {
        this._callApiSpec.withBody(this.reqBody);
      }
      this._isCalled = true;
    }
    return this._callApiSpec;
  }

  // API Call Flag
  private _isCalled: boolean = false;

  get isCalled(): boolean {
    return this._isCalled;
  }

  public getStatusCode(): string {
    return this._isCalled
      ? this._callApiSpec._response.statusCode.toString()
      : "-1";
  }

  public getResponseBody(): object {
    return this._isCalled ? this._callApiSpec._response.json : {};
  }

  resetCallConfig() {
    this._serverUrl = "";
    this.cleanupCallData();
  }

  cleanupCallData() {
    this._reqMethod = HttpMethod.GET;
    this._reqPath = "/";
    this._reqPathParameters = new Map<string, PlainValue>();
    this._reqQueryParameters = new Map<string, PlainValue>();
    this._reqHeaders = new Map<string, PlainValue>();
    this._reqBody = new Map<string, PlainJson>();
    this.resetCallHistory();
  }

  resetCallHistory() {
    this._isCalled = false;
    this._callApiSpec = null;
  }
}
