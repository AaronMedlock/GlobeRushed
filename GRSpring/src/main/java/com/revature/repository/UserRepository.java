package com.revature.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.User;

public interface UserRepository extends JpaRepository<User, Long> 
{
	User findByUsername(String username);
	User findById(long id);
	User save(User user);
	void deleteUser(long id);
	
}
