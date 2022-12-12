import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';

@binding()
class AccountDepositSteps {
  private accountBalance: number = 0;

  @given(/시작 잔액이 (\d*)원인 은행 계좌가 주어질 때/, "Example")
  public givenAnAccountWithStartingBalance(amount: number) {
    this.accountBalance = Number(amount);
  }

  @when(/(\d*)원을 입금한다면/, "Example")
  public deposit(amount: number) {
    this.accountBalance = Number(this.accountBalance) + Number(amount);
  }

  @then(/해당 계좌의 잔액은 (\d*)원이 되어야 한다/, "Example")
  public accountBalanceShouldEqual(expectedAmount: number) {
    assert.equal(expectedAmount, this.accountBalance);
  }
}

export = AccountDepositSteps;
