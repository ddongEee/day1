package io.github.ddongeee.day1.infrastructures;

import io.github.ddongeee.day1.domains.SubscriptionPlan;
import io.github.ddongeee.day1.domains.SubscriptionPlanRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionPlanJpaRepository extends SubscriptionPlanRepository, JpaRepository<SubscriptionPlan, Long> {
}
