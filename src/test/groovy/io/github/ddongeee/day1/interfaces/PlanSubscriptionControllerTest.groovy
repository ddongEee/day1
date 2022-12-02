package io.github.ddongeee.day1.interfaces

import io.github.ddongeee.day1.applications.PlanSubscriber
import org.mapstruct.factory.Mappers
import spock.lang.Specification
import static io.github.ddongeee.day1.interfaces.PlanSubscriptionController.*


class PlanSubscriptionControllerTest extends Specification {
    def mapper = Mappers.getMapper(PlanSubscriptionControllerMapper.class)

    def "mapper:::toCommand"() {
        given:
        def userId = "1"
        def code = "modelA"
        def request = new SubscribePlanRequest(userId, code)
        when:
        def command = mapper.toCommand(request)
        then:
        command.getUserId() == userId
        command.getPlanCode() == code
    }

    def "mapper:::toResponse"() {
        given:
        def planCode = "modelA"
        def vo = new PlanSubscriber.SubscribedPlanVo(planCode)
        when:
        def response = mapper.toResponse(vo)
        then:
        response.getSubscribedPlanCode() == planCode
    }

    def "mapper:::toChangeCommand"() {
        given:
        def userId = "1"
        def code = "modelA"
        def request = new ChangingSubscriptionPlanRequest(userId, code)
        when:
        def command = mapper.toChangeCommand(request)
        then:
        command.getUserId() == userId
        command.getCode() == code
    }
}
