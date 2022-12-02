package io.github.ddongeee.day1.applications

import io.github.ddongeee.day1.domains.SubscriptionPlan
import org.mapstruct.factory.Mappers
import spock.lang.Specification

class PlanSubscriberTest extends Specification {
    def mapper = Mappers.getMapper(PlanSubscriber.PlanSubscriberMapper.class)

    def "mapper:::toEntity"() {
        given:
        def userId = "1"
        def planCode = "modelA"
        def command = new PlanSubscriber.SubscribePlanCommand(userId, planCode)
        when:
        def entity = mapper.toEntity(command)
        then:
        entity.getUserId() == userId
        entity.getPlanCode() == planCode
    }

    def "mapper:::toVo"() {
        given:
        def userId = "1"
        def planCode = "modelA"
        def entity = new SubscriptionPlan(null, userId, planCode)
        when:
        def vo = mapper.toVo(entity)
        then:
        vo.getPlanCode() == planCode
    }
}
