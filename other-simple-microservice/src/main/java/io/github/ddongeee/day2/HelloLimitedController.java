package io.github.ddongeee.day2;

import com.google.common.util.concurrent.RateLimiter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SuppressWarnings("UnstableApiUsage")
public class HelloLimitedController {
    private final RateLimiter limiter = RateLimiter.create(1.0);
    @GetMapping("/hello")
    public ResponseEntity<String> helloLimited() {
        return v1Test();
    }

    public ResponseEntity<String> v1Test() {
        if (limiter.tryAcquire()) {
            return ResponseEntity.ok("GOOD :)");
        } else {
            return ResponseEntity.badRequest().body("BAD :(");
        }
    }
}


