# language: ko
@Subscription
기능: 요금제 가입 관리
  서비스 이용자로서
  가입한 통신사에서 제공하는 다른 요금제로 선택해서 자유롭게 가입하거나 변경하거나 해지할 수 있다.
  그래서 상황에 따라 언제든지 다른 과금제를 쉽게 변경해서 비용효과적인 통신서비스 경험을 얻는다.

  Rule:
  - 시스템에 접근하는 요청은 인증 시스템을 통과한 것으로 간주한다.
  - 통신사가 제공하는 요금제는 다음으로 한정한다: 요금제A, 요금제B, 요금제C

  @UnSubscribed @PassCase
  시나리오: '요금제에 가입되어 있지 않은' 서비스 이용자는 통신사에서 제공하는 요금제를 확인할 수 있다.
    만약 시스템의 '/mobile-plans' 경로의 API를 'GET' 방식으로
    그리고 호출한다면,
    그러면 반환된 HTTP 상태코드는 '200'이다.
    그리고 반환된 본문은 '3'건의 정보로 구성되어 있다.
    그리고 반환된 본문은 다음과 같다.
      | Key | Type | Value                                 |
      | 0   | SET  | { "name": "요금제A", "code": "modelA" } |
      | 1   | SET  | { "name": "요금제B", "code": "modelB" } |
      | 2   | SET  | { "name": "요금제C", "code": "modelC" } |

  @WIP #TODO
  @UnSubscribed @PassCase
  시나리오: '요금제에 가입되어 있지 않은' 서비스 이용자는 가입되어 있지 않은 상태를 확인할 수 있다.
    먼저 '1'번 사용자가 '요금제A'에 가입되어 있지 않을 때,
    만약 시스템의 '/subscription-plans/users/1' 경로의 API를 'GET' 방식으로
    그리고 호출한다면,
    그러면 반환된 HTTP 상태코드는 '200'이다.
    그리고 반환된 본문은 '1'건의 정보로 구성되어 있다.
    그리고 반환된 본문의 '가입된 요금제 코드'를 의미하는 'subscribedPlanCode' Key의 값은 'empty'이다.

  @WIP #TODO
  @UnSubscribed @PassCase
  시나리오: '요금제에 가입되어 있지 않은' 서비스 이용자는 통신사에서 제공하는 요금제로 신규가입할 수 있다.
    만약 시스템의 '/subscription-plans' 경로의 API를 'POST' 방식으로
    그리고 아래 정보로 요금제 신청 정보를 구성해서
      | Key    | Type | Value  | Mean   |
      | userid | NUM  | 1      | 사용자 1 |
      | code   | STR  | modelA | 요금제A |
    그리고 호출한다면,
    그러면 반환된 HTTP 상태코드는 '200'이다.
    그리고 반환된 본문은 비어있다.

  @WIP #TODO
  @Subscribed @PassCase
  시나리오: 요금제에 가입된 서비스 이용자는 가입된 요금제를 확인할 수 있다.
    먼저 '1'번 사용자가 '요금제A'에 가입되어 있을 때,
    만약 시스템의 '/subscription-plans/users/1' 경로의 API를 'GET' 방식으로
    그리고 호출한다면,
    그러면 반환된 HTTP 상태코드는 '200'이다.
    그리고 반환된 본문은 '1'건의 정보로 구성되어 있다.
    그리고 반환된 본문의 '가입된 요금제 코드'를 의미하는 'subscribedPlanCode' Key의 값은 'modelA'이다.

  @WIP #TODO
  @Subscribed @PassCase
  시나리오: 요금제에 가입된 서비스 이용자는 다른 요금제로 변경할 수 있다.
    먼저 '1'번 사용자가 '요금제A'에 가입되어 있을 때,
    만약 시스템의 '/subscription-plans' 경로의 API를 'PUT' 방식으로
    그리고 아래 정보로 요금제 신청 정보를 구성해서
      | Key    | Type | Value  | Memo   |
      | userid | NUM  | 1      | 사용자 1 |
      | code   | STR  | modelB | 요금제B |
    그리고 호출한다면,
    그러면 반환된 HTTP 상태코드는 '200'이다.
    그리고 반환된 본문은 비어있다.

  @WIP #TODO
  @Subscribed @PassCase
  시나리오: 요금제에 가입된 서비스 이용자는 가입된 요금제를 해지할 수 있다
    먼저 '1'번 사용자가 '요금제B'에 가입되어 있을 때,
    만약 시스템의 '/unsubscription-plans' 경로의 API를 'POST' 방식으로
    그리고 아래 정보로 요금제 신청 정보를 구성해서
      | Key    | Type | Value  | Memo   |
      | userid | NUM  | 1      | 사용자 1 |
    그리고 호출한다면,
    그러면 반환된 HTTP 상태코드는 '200'이다.
    그리고 반환된 본문은 비어있다.
