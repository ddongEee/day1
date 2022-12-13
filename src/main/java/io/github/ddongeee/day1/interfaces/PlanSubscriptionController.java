package io.github.ddongeee.day1.interfaces;

import io.github.ddongeee.day1.applications.PlanSubscriber;
import io.github.ddongeee.day1.applications.PlanSubscriber.SubscribePlanCommand;
import lombok.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.web.bind.annotation.*;
import static io.github.ddongeee.day1.applications.PlanSubscriber.*;

@RestController
@RequiredArgsConstructor
public class PlanSubscriptionController {
    private final PlanSubscriptionControllerMapper mapper = Mappers.getMapper(PlanSubscriptionControllerMapper.class);
    private final PlanSubscriber planSubscriber;

    @GetMapping("/subscription-plans/users/{userId}")
    public SubscribedPlanResponse getSubscribedPlan(@PathVariable String userId) {
        SubscribedPlanVo subscribedPlanVo = planSubscriber.querySubscribedPlan(userId);
        if ( subscribedPlanVo == null) {
            SubscribedPlanResponse subscribedPlanResponse = new SubscribedPlanResponse();
            subscribedPlanResponse.setSubscribedPlanCode("empty");
            return subscribedPlanResponse;
        }
        SubscribedPlanResponse subscribedPlanResponse = mapper.toResponse(subscribedPlanVo);
        return subscribedPlanResponse;
    }

    @PostMapping("/subscription-plans")
    public void subscribePlan(@RequestBody SubscribePlanRequest request) {
        SubscribePlanCommand command = mapper.toCommand(request);
        planSubscriber.subscribe(command);
    }

    @PutMapping("/subscription-plans")
    public void changeSubscriptionPlan(@RequestBody ChangingSubscriptionPlanRequest request) {
        ChangingSubscriptionPlanCommand command = mapper.toChangeCommand(request);
        planSubscriber.changeSubscriptionPlan(command);
    }

    @PostMapping("/unsubscription-plans/users/{userId}")
    public void unsubscribePlan(@PathVariable String userId) {
        planSubscriber.unsubscribe(userId);
    }

    @Value
    @Builder
    public static class SubscribePlanRequest {
        String userId;
        String code;
    }

    @Value
    public static class ChangingSubscriptionPlanRequest {
        String userId;
        String code;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubscribedPlanResponse {
        String subscribedPlanCode;
    }

    @Mapper
    public interface PlanSubscriptionControllerMapper {
        @Mapping(source = "code", target = "planCode")
        SubscribePlanCommand toCommand(SubscribePlanRequest request);
        @Mapping(source = "planCode", target = "subscribedPlanCode")
        SubscribedPlanResponse toResponse(SubscribedPlanVo vo);
        ChangingSubscriptionPlanCommand toChangeCommand(ChangingSubscriptionPlanRequest request);
    }
}
