package io.github.ddongeee.day1.interfaces

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.testcontainers.spock.Testcontainers
import spock.lang.Specification

// todo : 폴더 따로 구분하기
@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class MobilePlanControllerIntegrationTest extends Specification {
    @Autowired
    TestRestTemplate restTemplate

    def "MobilePlanController.mobilePlans()"() {
        expect:
        def list = restTemplate.getForObject("/mobile-plans", MobilePlanController.MobilePlanResponse[].class)
        list[0].name == '요금제A'
        list[0].code == 'modelA'
        list[1].name == '요금제B'
        list[1].code == 'modelB'
        list[2].name == '요금제C'
        list[2].code == 'modelC'
    }
}
