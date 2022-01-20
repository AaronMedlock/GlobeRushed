package com.revature;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.revature.models.User;
import com.revature.repository.UserRepository;

@SpringBootApplication
public class GrSpringApplication {

	// for sending values to DB
	@Autowired
	UserRepository userRepository;
	
	public static void main(String[] args) 
	{
		SpringApplication.run(GrSpringApplication.class, args);
	}
	
	@PostConstruct
	public void initUsers() {
		userRepository.save(new User("thisUsername","thisPassword"));
		
		System.out.println(userRepository.findAll());
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/*").allowedHeaders("*").allowedOriginPatterns("*").allowedMethods("*")/*.allowCredentials(true)*/;
			}
		};
	}

}
