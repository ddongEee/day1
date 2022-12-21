import { DataTable } from "@cucumber/cucumber";
import { binding, given, then, when } from "cucumber-tsflow";
import * as log from "loglevel";

import DefaultNavigatorSteps from "#step_definitions/Default.Navigator.steps";
import { EnvUtils, makePrefix } from "#utils/for-common";
import { convertToJson } from "#utils/for-test-data/DataTableUtils";
import { expect } from 'chai';

@binding([DefaultNavigatorSteps])
class MobilePalnSubscriptionSteps {
  readonly prefix = makePrefix("mobile-plan > subscription");
  constructor(
    protected root: DefaultNavigatorSteps,
    protected userStatus: object = {},
  ) {
    log.setLevel(EnvUtils.readLogLevel());
    log.debug(`${this.prefix}* Shared from bounded background..`);
  }

  @when(/^아래 정보로 요금제 신청 정보를 구성해서$/, "@subscription")
  public whenPresentSubscriptionPlanData(dataTable: DataTable): void {
    const subscriptionPlan = convertToJson(
      dataTable,
      "SubscriptionPlanData"
    ) as SubscriptionPlanDataSchema;
    log.debug(
      `${this.prefix} - SubscriptionPlanData: ${JSON.stringify(subscriptionPlan)}`
    );
    for (const key in subscriptionPlan) {
      this.root.navigator.appendBody(key, subscriptionPlan[`${key}`]);
    }
    log.debug(
      `${this.prefix} - navigator.reqBody : ${JSON.stringify(
        this.root.navigator.reqBody
      )}`
    );
  }

  @given(/^'(\d*)'번 사용자가 어떠한 요금제에도 가입되어 있지 않을 때,$/, "@subscription and @un-subscribed-user")
  @then(/^'(\d*)'번 사용자는 요금제가 해지되었다.$/, "@subscription and @subscribed-user")
  public givenUserIsNotSubscribed(userid: string): void {
    this.userStatus = { [`${userid}`]: undefined }
    const memorizedPlanName = this.getCurrentPlanName(userid);
    expect(memorizedPlanName).is.equal(undefined);
  }

  @when(/^'(\d*)'번 사용자가 '(.*)'에 가입되어 있을 때,$/, "@subscription and @subscribed-user")
  @then(/^'(\d*)'번 사용자는 '(.*)'로 가입되었다.$/, "@subscription")
  public thenMemorizeUserHasSubscribed(userid: string, planName: string): void {
    this.userStatus = { [`${userid}`]: planName }
    const memorizedPlanName = this.getCurrentPlanName(userid);
    expect(memorizedPlanName).is.equal(planName)
  }

  private getCurrentPlanName(userid: string) {
    const planName = this.userStatus[`${userid}`];
    log.debug(`${this.prefix}| this.userStatus[${userid}]: ${planName}`);
    return planName;
  }
}

interface SubscriptionPlanDataSchema {
  readonly profileId: string;
  readonly saId: string;
}

export = MobilePalnSubscriptionSteps;
