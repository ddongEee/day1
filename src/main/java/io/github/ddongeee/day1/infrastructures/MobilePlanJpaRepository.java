package io.github.ddongeee.day1.infrastructures;

import io.github.ddongeee.day1.domains.MobilePlan;
import io.github.ddongeee.day1.domains.MobilePlanRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MobilePlanJpaRepository extends MobilePlanRepository, JpaRepository<MobilePlan, Long> {
}
