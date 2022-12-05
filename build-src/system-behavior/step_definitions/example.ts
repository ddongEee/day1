import {binding, given, then, when} from 'cucumber-tsflow';
import {assert} from 'chai';

@binding()
export class AccountDepositSteps {
  private accountBalance: number = 0;

  @given(/시작 잔액이 (\d*)원인 은행 계좌가 주어질 때/)
  public givenAnAccountWithStartingBalance(amount: number) {
    this.accountBalance = amount;
  }

  @when(/(\d*)원을 입금한다면/)
  public deposit(amount: number) {
    this.accountBalance = Number(this.accountBalance) + Number(amount);
  }

  @then(/해당 계좌의 잔액은 (\d*)원이 되어야 한다/)
  public accountBalanceShouldEqual(expectedAmount: number) {
    assert.equal(this.accountBalance, expectedAmount);
  }
}
