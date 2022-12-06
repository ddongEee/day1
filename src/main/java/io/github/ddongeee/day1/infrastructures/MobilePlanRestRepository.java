package io.github.ddongeee.day1.infrastructures;

import io.github.ddongeee.day1.domains.MobilePlan;
import io.github.ddongeee.day1.domains.MobilePlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import java.util.Arrays;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MobilePlanRestRepository implements MobilePlanRepository {
    private final RestTemplate restTemplate;

    @Override
    public List<MobilePlan> findAll() {
        MobilePlan[] forObject = restTemplate.getForObject("/mobile-plans", MobilePlan[].class);
        return Arrays.asList(forObject);
    }
}
