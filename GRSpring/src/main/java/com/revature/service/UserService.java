package com.revature.service;

import com.revature.models.User;

public interface UserService {
	
	User save(User user);
	User findById(int id);
	User findByUsername(String username);
	User addFriendByUsername(String username,String friendName);
}