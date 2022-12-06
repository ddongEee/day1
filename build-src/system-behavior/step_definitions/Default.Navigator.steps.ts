import { after, before, binding, then, when } from "cucumber-tsflow";
import { DataTable } from "@cucumber/cucumber";
import { expect } from "chai";
import * as log from "loglevel";

import { Navigator } from "#utils/for-rest-api";
import { EnvUtils, ErrorUtils, FileUtils } from "#utils/for-common";
import { filterQuotations } from "#utils/for-test-data/DataStringUtils";
import {
  convertToArray,
  convertToJson,
} from "#utils/for-test-data/DataTableUtils";

export function makePrefix(tag: string = "no-tagged"): string {
  return `      🚀 [${tag}] `;
}

@binding()
export default class DefaultNavigatorSteps {
  public navigator: Navigator = new Navigator();
  readonly defaultReqHeader = FileUtils.readDefaultReqHeader();
  readonly defaultReqBody = FileUtils.readDefaultReqBody();
  readonly prefix = makePrefix("Root");
  constructor() {
    log.setLevel(EnvUtils.readLogLevel());
  }

  @before()
  public beforeEachScenarios() {
    log.debug(
      `\n${this.prefix}* INIT! Before all scenarios, a new Navigator for this scenario.`
    );
    this.navigator = new Navigator();
    this.setServerEndpoint();
    this.setDefaultRequestHeader();
    this.setDefaultRequestBody();
  }

  private setServerEndpoint(): void {
    this.navigator.serverUrl = EnvUtils.readSystemEndpoint();
    log.debug(`${this.prefix}| navigator.serverUrl: ${this.navigator.serverUrl}`);
  }

  private setDefaultRequestHeader(): void {
    Object.keys(this.defaultReqHeader).map(key => {
      this.navigator.appendHeader(key, this.defaultReqHeader[`${key}`]);
    });
    log.debug(
      `${this.prefix}| navigator.reqHeaders: ${JSON.stringify(
        this.navigator.reqHeaders
      )}`
    );
  }

  private setDefaultRequestBody(): void {
    Object.keys(this.defaultReqBody).map(key => {
      this.navigator.appendBody(key, this.defaultReqBody[`${key}`]);
    });
    log.debug(
      `${this.prefix}| navigator.reqBody: ${JSON.stringify(this.navigator.reqBody)}`
    );
  }

  @after()
  public afterEachScenarios() {
    this.navigator.resetCallConfig();
    log.debug(
      `${this.prefix}* DONE! the used Navigator's call config has been reset.\n`
    );
  }

  @when(/^시스템의 '(.*)' 경로의 API를 '(.*)' 방식으로$/)
  public whenDoesPathAndMethodLikeThis(path: string, httpMethod: string) {
    this.navigator.reqPath = filterQuotations(path, "HTTP API Path");
    this.navigator.reqMethod = filterQuotations(httpMethod, "HTTP Method");
    log.debug(`${this.prefix}| navigator.reqPath - ${this.navigator.reqPath}`);
    log.debug(`${this.prefix}| navigator.reqMethod - ${this.navigator.reqMethod}`);
  }

  @when(/^호출한다면,$/)
  public async whenDoApiCall() {
    log.debug(
      `${this.prefix}| navigator.reqBody: ${JSON.stringify(
        this.navigator.reqBody
      )}`
    );
    await this.navigator.navigate().toss();
  }

  @then(/^반환된 HTTP 상태코드는 '(\d{3})'이다.$/)
  public thenResponseStatusCodeMustBe(statusCode: string) {
    // Assertion
    expect(this.navigator.getStatusCode()).to.be.equal(statusCode);
  }

  @then(/^반환된 본문은 비어있다.$/)
  public thenResponseBodyIsEmpty() {
    const responseBody = this.navigator.getResponseBody();
    expect(JSON.stringify(responseBody)).is.equal("{}");
  }

  @then(/^반환된 본문은 다음과 같다.$/)
  public thenResponseBodyDataMustBeLike(dataTable: DataTable) {
    const responseBody = this.navigator.getResponseBody();
    const expectedResBodyData = convertToJson(dataTable, "ExpectedResBodyData");
    const expectedResBodyJson = convertToArray(expectedResBodyData);
    expect(JSON.stringify({ ...responseBody }))
      .is.equal(JSON.stringify({ ...expectedResBodyJson }));
  }

  @then(/^반환된 본문은 '(\d*)'건의 정보로 구성되어 있다.$/)
  public thenResponseBodyLengthMustBeConsistOf(length: string) {
    const expectedLength = Number(length);
    if (expectedLength < 1) {
      throw ErrorUtils.invalidInput("expectedLength", "Positive Integer");
    }

    // Expect Singular (json)
    const responseBody = this.navigator.getResponseBody();
    const stringifyBody = JSON.stringify(responseBody);
    if (expectedLength === 1) {
      this.expectJson(stringifyBody);
      return;
    }
    this.expectJsonArray(stringifyBody, expectedLength);
  }

  private expectJson(str: string) {
    const isSingular = str.startsWith("{");
    expect(isSingular).to.be.equal(true, "Expect the shape like - {k: v}");
    expect(str).is.not.equal("{}");
  }

  private expectJsonArray(str: string, expectedLength: number) {
    const isArray = str.startsWith("[{");
    expect(isArray).to.be.equal(
      true,
      "Expect the shape like - [{k: v}, {k: v}]"
    );
    expect(str).is.not.equal("[{}]");

    const arrLength = JSON.parse(str).length;
    expect(arrLength).is.equal(expectedLength);
  }

  @then(/^반환된 본문의 '(.*)'를 의미하는 '(\w*)' Key의 값은 '(.*)'이다.$/)
  public thenResponseBodyDataMustBe(
    keyMean: string,
    keyName: string,
    expectValue: string
  ) {
    // Assertion
    const responseBody = this.navigator.getResponseBody();
    const filteredValue = filterQuotations(expectValue, "String Value");
    expect(responseBody[keyName]).to.be.equal(
      filteredValue,
      `This key means about '${keyMean}'`
    );
  }
}
