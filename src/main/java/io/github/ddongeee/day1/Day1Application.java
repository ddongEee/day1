package io.github.ddongeee.day1;

import io.github.ddongeee.day1.applications.ClientReader;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@Slf4j
@SpringBootApplication
public class Day1Application {
	public static void main(String[] args) {
		SpringApplication.run(Day1Application.class, args);
	}

	@Autowired
	private ClientReader clientReader;

	@EventListener(ApplicationReadyEvent.class)
	public void doSomethingAfterStartup() {
		log.info("@@@ hello world, I have just started up");
		log.info("@@@ clientName ::: {}", clientReader.findAnyName());
	}
}
