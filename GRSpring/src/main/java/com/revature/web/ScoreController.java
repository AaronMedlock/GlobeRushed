package com.revature.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.revature.models.Score;
import com.revature.service.ScoreService;


public class ScoreController
{
	@Autowired
	ScoreService scoreService;
	
	@PostMapping
	public ResponseEntity<Score> addScore(@RequestBody Score score)
	{
		return ResponseEntity.ok(scoreService.save(score));
	}
	
}
