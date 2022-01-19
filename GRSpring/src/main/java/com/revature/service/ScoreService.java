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
	
	@Transactional()
	public List<Score> findAll()
	{
		return scoreRepo.findAllScores().stream().collect(Collectors.toList());
	}
	
	@Transactional()
	public List<Score> findByUser(User user)
	{
		return scoreRepo.findByUser(user).stream().collect(Collectors.toList());
	}
	
//	@Transactional
//	public List<Score> findScoreByLocation(long latitude,long longitude)
//	{
//		return scoreRepo.findScoreByLocation(latitude, longitude).stream().collect(Collectors.toList());
//	}
	
	@Transactional
	public Score save(Score score)
	{
		// TODO Auto-generated method stub
		return null;
	}
}
