package com.revature.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.revature.models.User;
import com.revature.repository.UserRepository;
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    
    //@Autowired
    //private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	@Override
	public User save(User user) {
        //user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
		return user;
	}

	@Override
	public User findByUsername(String username) {
		
		return userRepository.findByUsername(username);
	}

//	@Override
//	public void deleteUser(int id)
//	{
//		//TODO
//		
//	}

	@Override
	public User findById(int id)
	{
		// TODO Auto-generated method stub
		return null;
	}

}
