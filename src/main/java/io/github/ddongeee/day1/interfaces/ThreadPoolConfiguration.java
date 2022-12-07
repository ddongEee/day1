package io.github.ddongeee.day1.interfaces;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class ThreadPoolConfiguration {
    @Bean
    public TaskExecutor threadPoolExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setCorePoolSize(100);	// 기본 스레드 수
        taskExecutor.setMaxPoolSize(100);	// 최대 스레드 수
        return taskExecutor;
    }
}
