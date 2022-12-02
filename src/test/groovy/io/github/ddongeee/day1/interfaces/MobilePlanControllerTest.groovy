package io.github.ddongeee.day1.interfaces

import io.github.ddongeee.day1.interfaces.MobilePlanController.MobilePlanControllerMapper
import org.mapstruct.factory.Mappers
import spock.lang.Specification

import static io.github.ddongeee.day1.applications.MobilePlanResolver.MobilePlanVo

class MobilePlanControllerTest extends Specification {
    def mapper = Mappers.getMapper(MobilePlanControllerMapper.class)

    def "Mapper:::toResponse 테스트"() {
        given:
        String name = "요금제A"
        String code = "modelA"
        def mobilePlanVo = new MobilePlanVo(name, code)
        def mobilePlanVos = List.of(mobilePlanVo)

        when:
        def response = mapper.toResponse(mobilePlanVo)
        def responses = mapper.toResponses(mobilePlanVos)

        then:
        response.getName() == name
        response.getCode() == code

        def firstResponse = responses.get(0)
        firstResponse.getName() == name
        firstResponse.getCode() == code
    }
}
