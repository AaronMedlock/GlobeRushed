package com.revature.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.User;
import com.revature.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*") //TODO change to spring security compliant configuration
public class UserController 
{
	@Autowired
	UserService userService;
	
	@PostMapping("/add")
	public ResponseEntity<User> addUser(@RequestBody User u) 
	{ 
		return ResponseEntity.ok(userService.save(u)); 
	}
	
	@GetMapping("/find/{username}")  // localhost:5000/users/find/spongebob <- we extract this parameter
	public ResponseEntity<User> findByUsername(@PathVariable("username") String username) 
	{		
		return ResponseEntity.ok(userService.findByUsername(username));
	}
	
	@GetMapping("")
	public ResponseEntity<User> findById(@PathVariable("id") int id)
	{
		return ResponseEntity.ok(userService.findById(id));
	}
}
