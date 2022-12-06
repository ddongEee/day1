package io.github.ddongeee.day1.infrastructures;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class RestSourceConfiguration {
    @Value("${microservice.day2.url}")
    private String day2Url;
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplateBuilder()
                .rootUri(day2Url)
                .setConnectTimeout(Duration.ofMillis(1000))
                .build();
    }
}
