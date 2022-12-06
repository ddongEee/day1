package io.github.ddongeee.day1.interfaces;

import io.github.ddongeee.day1.applications.MobilePlanResolver;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.core.task.TaskExecutor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static io.github.ddongeee.day1.applications.MobilePlanResolver.MobilePlanVo;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/mobile-plans")
public class MobilePlanController {
    private final MobilePlanControllerMapper mapper = Mappers.getMapper(MobilePlanControllerMapper.class);
    private final MobilePlanResolver mobilePlanResolver;
    private final TaskExecutor taskExecutor;

    @GetMapping
    public List<MobilePlanResponse> mobilePlans() {
        List<MobilePlanVo> results = mobilePlanResolver.getAll();
        return mapper.toResponses(results);
    }

    public List<MobilePlanResponse> mobilePlansWithSleep(int tryCount, long sleepTime) {
        if (tryCount % 10 == 0) log.info("[{}] called", tryCount);
        List<MobilePlanVo> results = mobilePlanResolver.getAll();
        try {
            Thread.sleep(sleepTime);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return mapper.toResponses(results);
    }

    @GetMapping("/bulk/{count}/{sleepTime}")
    public List<MobilePlanResponse> mobilePlansBulk(@PathVariable int count, @PathVariable long sleepTime) throws InterruptedException {
        List<MobilePlanVo> results = mobilePlanResolver.getAll();
        for (AtomicInteger tryCount = new AtomicInteger(0); tryCount.get() < count;) {
            final int targetCount = tryCount.incrementAndGet();
            taskExecutor.execute(() -> mobilePlansWithSleep(targetCount, sleepTime));
        }
        log.info("Calling finished");
        return mapper.toResponses(results);
    }

    @Value
    public static class MobilePlanResponse {
        String name;
        String code;
    }

    @Mapper
    public interface MobilePlanControllerMapper {
        MobilePlanResponse toResponse(MobilePlanVo vo);
        List<MobilePlanResponse> toResponses(List<MobilePlanVo> vos);
    }
}
