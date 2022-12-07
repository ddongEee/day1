package io.github.ddongeee.day2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.LongStream;

@RestController
@RequestMapping("/test")
public class TestController {
    private static final long targetEndLong = 10000000000L;
    @GetMapping("/common")
    public long commonTest() {
        return LongStream.range(0, targetEndLong)
                .reduce(Long::sum)
                .getAsLong();
    }

    @GetMapping("/parallel")
    public long parallelTest() {
        return LongStream.range(0, targetEndLong).parallel()
                .reduce(Long::sum)
                .getAsLong();
    }
}
