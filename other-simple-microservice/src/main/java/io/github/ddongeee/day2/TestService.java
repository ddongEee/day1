package io.github.ddongeee.day2;

import com.google.common.collect.Lists;
import com.google.common.util.concurrent.RateLimiter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Service
@SuppressWarnings("UnstableApiUsage")
public class TestService {
    private final RateLimiter limiter = RateLimiter.create(100.0);
    private final AtomicInteger receivedCount = new AtomicInteger(0);

    private final List<MobilePlanController.MobilePlanDto> mobilePlans = Lists.newArrayList(
            MobilePlanController.MobilePlanDto.builder().name("요금제A").code("modelA").build(),
            MobilePlanController.MobilePlanDto.builder().name("요금제B").code("modelB").build(),
            MobilePlanController.MobilePlanDto.builder().name("요금제C").code("modelC").build()
    );

    public List<MobilePlanController.MobilePlanDto> v1Test() {
        if (limiter.tryAcquire()) {
            return mobilePlans;
        } else {
            try {
                log.warn("[{}]too many request!!", receivedCount.incrementAndGet());
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            return mobilePlans;
        }
    }

    public void init() {
        receivedCount.set(0);
        log.info("INIT COUNT");
    }
}
