package com.revature.web;


import java.util.Map;

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
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController 
{
	@Autowired
	UserService userService;
	
	@PostMapping("/add")
	public ResponseEntity<User> addUser(@RequestBody User u) 
	{ 
		return ResponseEntity.ok(userService.save(u)); 
	}
	/*
	 * Spring should recieve a json object with two strings the calling user's username
	 * as well as the username of the friend to be added
	 * {
	 * 	"username":"u",
	 * 	"friend_name":"f"
	 * }
	 */
	@PostMapping("/add/friend")
	public ResponseEntity<User> addFriend(@RequestBody Map<String,String> jsonResponse)
	{
		String username = jsonResponse.get("username");
		String friendName = jsonResponse.get("friend_name");
		//call userservice function, adds friend and returns the updated user back
		return ResponseEntity.ok(userService.addFriendByUsername(username, friendName));
	}
	
	@GetMapping("/find/{username}")  // localhost:5000/users/find/spongebob <- we extract this parameter
	public ResponseEntity<User> findByUsername(@PathVariable("username") String username) 
	{		
		return ResponseEntity.ok(userService.findByUsername(username));
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<User> findById(@PathVariable("id") int id)
	{
		return ResponseEntity.ok(userService.findById(id));
	}
}
