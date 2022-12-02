package io.github.ddongeee.day1.domains;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Slf4j
@Entity
@Getter
@Setter
@ToString
@Table(name = "subscription_plans")
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userId;
    private String planCode;

    public void changePlan(final String targetCode) {
        log.info("[SubscriptionPlan] 요금제 변경 from : {}, to : {}", this, targetCode);
        this.planCode = targetCode;
    }
}
