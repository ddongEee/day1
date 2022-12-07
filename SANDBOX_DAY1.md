SANDBOX.md
alt + tab = goto next split

---
- gradle , lombok compileonly, implementation,, option 관련 정리


# mapper test code 만들기
1. spock test class 생성
2. def mapper = Mappers.getMapper(xxx.class)
## multi create, method 명만 복사
3. def ""() 메소드 모두 정의,, name 은 mapper:::{toMethod명}
4. given: when: then: 생성
5. mapper.toMethod() 생성해서 param 추론

# API integration test code 만들기
1. // todo : 분리된 test directory 에 integration test spock class 생성
2. 아래 추가
```
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.context.SpringBootTest
import org.testcontainers.spock.Testcontainers

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
---
@Autowired
TestRestTemplate restTemplate
```
3. test method 만들기


<!-- 도움  -->
```bash
# docker-compose
docker-compose -f /Users/kmhak/Projects/personal/day1/docker-compose.yml up -d
docker-compose -f /Users/kmhak/Projects/personal/day1/docker-compose.yml down
docker-compose -f /Users/kmhak/Projects/personal/day1/docker-compose.yml logs --follow --tail="all"
```
- swagger : http://localhost:8081/swagger-ui/index.html#/plan-subscription-controller

```bash
# /subscription-plans
curl -X GET "http://localhost:8081/subscription-plans/users/1" -H "accept: */*"
curl -X GET "http://localhost:8081/subscription-plans/users/999" -H "accept: */*"
curl -X POST "http://localhost:8081/subscription-plans" -H "accept: */*" -H "Content-Type: application/json" -d "{ \"code\": \"modelC\", \"userId\": \"999\"}"

# Actuator 
# circuit breaker test urls
curl localhost:8082/mobile-plans/init-try-count && curl localhost:8081/mobile-plans/bulk/1000/0

curl localhost:8082/actuator/prometheus

curl localhost:8082/test/common
curl localhost:8082/test/parallel
```

# TODO
- feature flag 반영
- [정리]
    - https://www.baeldung.com/java-web-thread-pool-config 
        - https://kapentaz.github.io/spring/Spring-ThreadPoolTaskExecutor-%EC%84%A4%EC%A0%95/#
    - test container : https://www.testcontainers.org/
    - docker container connect btw machine localhost : https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach
    - docker 관련
      - db, volume mount 관련,, 추가 알아보기
    - springBootTest 에서 applicationContext 캐싱 관련 : https://suhwan.dev/2019/03/27/spring-test-context-management-and-caching/ 
- [고민]
    - xxxResponse 객체에서는 @Value 쓰기가 까탈스럽다.. api integration test 에서 restTemplate.getForObject 로 type 정의시.. convert 해야 되서.. NoArgs, @data씀..
    - 테스트 어느수준까지 해야 하는가? integration, ui test.. 등등.
    - flyway 버저닝 어떻게 할지.. ddl 과 dml 분리해야 할지?
- [질문]
    - KW 에서 api integration test 시에 @LocalServerPort 사용 이유?
    - flyway.migrate() 사용이유. 퍼포먼스.
- [반영]
  - interface parameter validation
  - grafana 설정 정보 persistence
  - day1app 도 grafana 반영
  - feature flag 반영!