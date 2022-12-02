package io.github.ddongeee.day1.applications;

import io.github.ddongeee.day1.domains.MobilePlan;
import io.github.ddongeee.day1.domains.MobilePlanRepository;
import lombok.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MobilePlanResolver {
    private final MobilePlanResolverMapper mapper = Mappers.getMapper(MobilePlanResolverMapper.class);
    private final MobilePlanRepository mobilePlanRepository;

    public List<MobilePlanVo> getAll() {
        List<MobilePlan> results = mobilePlanRepository.findAll();
        return mapper.toVos(results);
    }

    @Value
    public static class MobilePlanVo {
        String name;
        String code;
    }

    @Mapper
    public interface MobilePlanResolverMapper {
        MobilePlanVo toVo(MobilePlan mobilePlan);
        List<MobilePlanVo> toVos(List<MobilePlan> mobilePlans);
    }
}
