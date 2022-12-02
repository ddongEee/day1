package io.github.ddongeee.day1.interfaces;

import io.github.ddongeee.day1.applications.MobilePlanResolver;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import static io.github.ddongeee.day1.applications.MobilePlanResolver.MobilePlanVo;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mobile-plans")
public class MobilePlanController {
    private final MobilePlanControllerMapper mapper = Mappers.getMapper(MobilePlanControllerMapper.class);
    private final MobilePlanResolver mobilePlanResolver;

    @GetMapping
    public List<MobilePlanResponse> mobilePlans() {
        List<MobilePlanVo> results = mobilePlanResolver.getAll();
        return mapper.toResponses(results);
    }

    @Value
    public static class MobilePlanResponse {
        String name;
        String code;
    }

    @Mapper
    public interface MobilePlanControllerMapper {
        MobilePlanResponse toResponse(MobilePlanVo vo);
        List<MobilePlanResponse> toResponses(List<MobilePlanVo> vos);
    }
}
