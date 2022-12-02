package io.github.ddongeee.day1.interfaces

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.testcontainers.spock.Testcontainers
import spock.lang.Specification

import static io.github.ddongeee.day1.interfaces.PlanSubscriptionController.*

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PlanSubscriptionControllerIntegrationTest extends Specification {
    @Autowired
    TestRestTemplate restTemplate

    def "Get /subscription-plans/users/{userId}"() {
        expect:
        def userId = "1"
        def result = restTemplate.getForObject("/subscription-plans/users/" + userId, SubscribedPlanResponse.class)
        result.subscribedPlanCode == 'modelA'
    }

    /**
     * Post /subscription-plans
     * Put /subscription-plans
     * Post /unsubscription-plans/users/{userId}
    **/
    def "CUD test"() {
        when:"userId(:999)와 code(:modelD) 으로 요금제 가입 요청시"
        def userId = "999"
        def code = "modelD"
        def request = SubscribePlanRequest.builder()
                .userId(userId)
                .code(code)
                .build()
        def result = restTemplate.postForEntity("/subscription-plans", request, Void.class)
        then:"요금제 가입 성공"
        result.statusCode == HttpStatus.OK

        when:"요금제를 modelB 로 변경 할경우"
        def changeCode = "modelB"
        def changeRequest = SubscribePlanRequest.builder()
                .userId(userId)
                .code(changeCode)
                .build()
        def changeResult = restTemplate.exchange("/subscription-plans", HttpMethod.PUT, new HttpEntity<>(changeRequest), ResponseEntity.class)
        then:"성공적으로 변경 되었음을 확인"
        changeResult.statusCode == HttpStatus.OK

        when:"요금제를 해제하는경우"
        def unsubscribedResult = restTemplate.postForEntity("/unsubscription-plans/users/"+ userId, null, Void.class)
        then:"성공적으로 요금제가 해제되었음을 확인"
        unsubscribedResult.statusCode == HttpStatus.OK
    }
}
