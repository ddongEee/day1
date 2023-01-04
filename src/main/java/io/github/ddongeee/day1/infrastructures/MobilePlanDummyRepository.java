package io.github.ddongeee.day1.infrastructures;

import io.github.ddongeee.day1.domains.MobilePlan;
import io.github.ddongeee.day1.domains.MobilePlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MobilePlanDummyRepository implements MobilePlanRepository {

    @Override
    public List<MobilePlan> findAll() {
        List<MobilePlan> mobilePlans = new ArrayList<>();
        mobilePlans.add(new MobilePlan(1L, "요금제A", "modelA"));
        mobilePlans.add(new MobilePlan(2L, "요금제B", "modelB"));
        mobilePlans.add(new MobilePlan(3L, "요금제C", "modelC"));
        return mobilePlans;
    }
}
