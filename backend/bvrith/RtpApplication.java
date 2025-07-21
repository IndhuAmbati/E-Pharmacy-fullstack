package com.bvrith;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@ComponentScan(basePackages = "com")  
@EntityScan(basePackages = "com.model")  
@EnableJpaRepositories(basePackages = "com.dao")
@EnableScheduling
public class RtpApplication {

	public static void main(String[] args) {
		SpringApplication.run(RtpApplication.class, args);
	}

}
