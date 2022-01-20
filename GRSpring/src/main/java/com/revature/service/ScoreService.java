package com.revature.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import com.revature.models.Score;
import com.revature.models.User;
import com.revature.repository.ScoreRepository;

public class ScoreService
{
	@Autowired
	ScoreRepository scoreRepo;
	
	@Transactional
	public List<Score> findAll()
	{
		return scoreRepo.findAll().stream().collect(Collectors.toList());
	}
	
	@Transactional
	public List<Score> findByUser(User user)
	{
		return scoreRepo.findByUser(user).stream().collect(Collectors.toList());
	}
	
	@Transactional
	public Score findById(int id)
	{
		return scoreRepo.findById(id);
	}
	
	@Transactional
	public Score save(Score score)
	{
		return scoreRepo.save(score);
	}
}
