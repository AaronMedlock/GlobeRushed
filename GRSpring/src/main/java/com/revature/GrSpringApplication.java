package com.revature;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.revature.models.Score;
import com.revature.models.User;
import com.revature.repository.ScoreRepository;
import com.revature.repository.UserRepository;

@SpringBootApplication
public class GrSpringApplication {

	// for sending values to DB
	@Autowired
	UserRepository userRepository;
	@Autowired
	ScoreRepository scoreRepository;
	
	public static void main(String[] args) 
	{
		SpringApplication.run(GrSpringApplication.class, args);
	}
	
	@PostConstruct
	public void initUsers() 
	{
		System.out.println("Insert test users");
		userRepository.save(new User("thisUsername","thisPassword"));
		userRepository.save(new User("John","johnspassword"));
		System.out.println(userRepository.findAll());
		System.out.println("Insert test scores");
		
		User userJohn = userRepository.findByUsername("John");
		User defaultUser = userRepository.findByUsername("thisUsername");
		for(int i = 0;i < 100;i++)
		{
			scoreRepository.save(new Score((i*36),defaultUser,1,1));
			scoreRepository.save(new Score((i*22),userJohn,10,2));
		}
		//scoreRepository.save(new Score(100,defaultUser,1,1));
		System.out.println(scoreRepository.findAll());
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
