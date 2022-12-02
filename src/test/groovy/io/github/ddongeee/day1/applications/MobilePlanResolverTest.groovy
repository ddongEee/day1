package io.github.ddongeee.day1.applications

import io.github.ddongeee.day1.domains.MobilePlan
import org.mapstruct.factory.Mappers
import spock.lang.Specification

class MobilePlanResolverTest extends Specification {
    def mapper = Mappers.getMapper(MobilePlanResolver.MobilePlanResolverMapper.class)

    def "mapper:::toVo,toVos"() {
        given:
        def name = "요금제A"
        def code = "modelA"
        def entity = new MobilePlan(null, name, code)
        def entities = List.of(entity)
        when:
        def vo = mapper.toVo(entity)
        def firstVo = mapper.toVos(entities).get(0)
        then:
        vo.getName() == name
        vo.getCode() == code
        firstVo.getName() == name
        firstVo.getCode() == code
    }
}
