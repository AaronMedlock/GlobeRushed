package com.revature.service;

import com.revature.models.User;

public interface UserService {
	
	User save(User user);
	User findById(long id);
	User findByUsername(String username);
	void deleteUser(long id);


}