package io.github.ddongeee.day2;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/mobile-plans")
public class MobilePlanController {
    private final TestService testService;

    @GetMapping("/init-try-count")
    public void init() {
        testService.init();
    }

    @GetMapping
    public List<MobilePlanDto> mobilePlans() {
        return testService.v1Test();
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MobilePlanDto {
        private Long id;
        private String name;
        private String code;
    }
}
