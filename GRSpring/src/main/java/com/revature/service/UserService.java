package com.revature.service;

import com.revature.models.User;

public interface UserService {
	
	void save(User user);
	
	User findByUsername(String username);

}