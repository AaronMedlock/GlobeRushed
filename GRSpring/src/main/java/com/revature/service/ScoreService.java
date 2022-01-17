package com.revature.service;

import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import com.revature.models.Score;
import com.revature.repository.ScoreRepository;

public class ScoreService
{
	@Autowired
	ScoreRepository scoreRepo;
	
	@Transactional()
	public Set<Score> findAll()
	{
		return scoreRepo.findAllScores().stream().collect(Collectors.toSet());
	}
}
