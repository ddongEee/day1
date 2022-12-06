// Basic
export type PlainValue = string | number | boolean;
// Plain Json <~> Map
export interface PlainJson {
  [key: string]: PlainValue;
}
export type PlainMap = Map<string, PlainValue>;
// Dimensional Json <~> Map
export interface DimenJson {
  [key: string]: DimenJson | PlainJson | PlainValue;
}
export type DimenMap = Map<string, DimenJson | PlainValue>;

export default interface RestApiTestSpecs {
  /* HTTP Method */
  get reqMethod(): string;
  set reqMethod(inputReqMethod: string);

  /* Server URL */
  get serverUrl(): string;
  set serverUrl(inputServerUrl);

  /* Path */
  get reqPath(): string;
  set reqPath(inputReqPath: string);

  /* Path Parameters */
  get reqPathParameters(): PlainJson;
  set reqPathParameters(inputObj: PlainJson);
  /* Append tslint.json path parameter pair(k:v) to existed path parameters */
  appendPathParameter: (
    pathParamKey: string,
    pathParamValue: PlainValue
  ) => void;

  /* Query Parameters */
  get reqQueryParams(): PlainJson;
  set reqQueryParams(inputObj: PlainJson);
  /* Append tslint.json query parameter pair(k:v) to existed query parameters */
  appendQueryParameter: (
    pathParamKey: string,
    pathParamValue: PlainValue
  ) => void;

  /* Headers */
  get reqHeaders(): PlainJson;
  set reqHeaders(inputObj: PlainJson);
  /* Append tslint.json header pair(k:v) to existed headers */
  appendHeader: (headerKey: string, headerValue: PlainValue) => void;

  /* Body: json payload */
  get reqBody(): DimenJson;
  set reqBody(inputObj: DimenJson);
  /* Append tslint.json body pair(k:v) to existed body */
  appendBody: (bodyKey: string, bodyValue: PlainJson | PlainValue) => any;

  /* Call REST API with contained spec using third party tools */
  navigate: () => any;

  /* Call Flag */
  get isCalled(): boolean;

  /* Get received http response status code */
  getStatusCode: () => string;

  /* Get received http response body */
  getResponseBody: () => object;

  /* Reset call history (to re-call another time)  */
  resetCallHistory: () => any;
}
