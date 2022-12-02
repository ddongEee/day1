package io.github.ddongeee.day1.domains;

public interface SubscriptionPlanRepository {
    SubscriptionPlan save(SubscriptionPlan subscriptionPlan);
    SubscriptionPlan findByUserId(String userId);
    void delete(SubscriptionPlan subscribedPlan);
}
