package io.github.ddongeee.day1.applications;

import io.github.ddongeee.day1.domains.SubscriptionPlan;
import io.github.ddongeee.day1.domains.SubscriptionPlanRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.InvalidParameterException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PlanSubscriber {
    private final PlanSubscriberMapper mapper = Mappers.getMapper(PlanSubscriberMapper.class);
    private final SubscriptionPlanRepository subscriptionPlanRepository;

    public void subscribe(final SubscribePlanCommand command) {
        SubscriptionPlan subscriptionPlan = mapper.toEntity(command);
        SubscriptionPlan savedSubscriptionPlan = subscriptionPlanRepository.save(subscriptionPlan);
        log.info("[SubscriptionPlan] 가입완료 : {}", savedSubscriptionPlan);
    }

    @Transactional(readOnly = true)
    public SubscribedPlanVo querySubscribedPlan(String userId) {
        SubscriptionPlan subscriptionPlan = subscriptionPlanRepository.findByUserId(userId);
        return mapper.toVo(subscriptionPlan);
    }

    public void changeSubscriptionPlan(ChangingSubscriptionPlanCommand command) {
        SubscriptionPlan subscribedPlan = subscriptionPlanRepository.findByUserId(command.getUserId());
        subscribedPlan.changePlan(command.getCode());
        subscriptionPlanRepository.save(subscribedPlan);
    }

    public void unsubscribe(String userId) {
        SubscriptionPlan subscribedPlan = subscriptionPlanRepository.findByUserId(userId);
        if (subscribedPlan == null) {
            throw new InvalidParameterException("가입된 요금제가 없는 사용자 입니다. userId : "+ userId);
        }
        subscriptionPlanRepository.delete(subscribedPlan);
        log.info("[SubscriptionPlan] 요금제 해지 완료 : {}", subscribedPlan);
    }

    @Value
    public static class SubscribePlanCommand {
        String userId;
        String planCode;
    }

    @Value
    public static class ChangingSubscriptionPlanCommand {
        String userId;
        String code;
    }

    @Value
    @Getter
    public static class SubscribedPlanVo {
        String planCode;
    }

    @Mapper
    public interface PlanSubscriberMapper {
        SubscriptionPlan toEntity(SubscribePlanCommand command);
        SubscribedPlanVo toVo(SubscriptionPlan subscriptionPlan);
    }
}
