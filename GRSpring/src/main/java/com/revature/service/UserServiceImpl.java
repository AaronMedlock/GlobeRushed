package com.revature.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.User;
import com.revature.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    
	
	@Override
	public User save(User user) 
	{ 
		return userRepository.save(user);
	}

	@Override
	public User findByUsername(String username) {
		
		return userRepository.findByUsername(username);
	}

	@Override
	public User findById(int id)
	{
		return userRepository.findById(id);
	}
	
	public List<User> addFriendList()
	{
		return null;
	}

}
