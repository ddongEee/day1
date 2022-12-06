import { DataTable } from "@cucumber/cucumber";
import { binding, when } from "cucumber-tsflow";
import * as log from "loglevel";

import DefaultNavigatorSteps, { makePrefix } from "#step_definitions/Default.Navigator.steps";
import { EnvUtils } from "#utils/for-common";
import { convertToJson } from "#utils/for-test-data/DataTableUtils";

@binding([DefaultNavigatorSteps])
export default class MobilePalnSubscriptionSteps {
  readonly prefix = makePrefix("MobilePlan > Subscription");
  constructor(protected root: DefaultNavigatorSteps) {
    log.setLevel(EnvUtils.readLogLevel());
    log.debug(`${this.prefix}Shared from bounded background..`);
  }

  @when(/^아래 정보로 요금제 신청 정보를 구성해서$/, "@Subscription")
  public whenPresentSubscriptionPlanData(dataTable: DataTable) {
    const subscriptionPlan = convertToJson(
      dataTable,
      "SubscriptionPlanData"
    ) as SubscriptionPlanDataSchema;
    log.debug(
      `${this.prefix} - SubscriptionPlanData: ${JSON.stringify(subscriptionPlan)}`
    );
    for (const key in subscriptionPlan) {
      this.root.navigator.appendHeader(key, subscriptionPlan[`${key}`]);
    }
    log.debug(
      `${this.prefix} - navigator.reqBody : ${JSON.stringify(
        this.root.navigator.reqBody
      )}`
    );
  }
}

interface SubscriptionPlanDataSchema {
  readonly profileId: string;
  readonly saId: string;
}
