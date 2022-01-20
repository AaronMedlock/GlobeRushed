package com.revature.web;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Score;
import com.revature.service.ScoreService;
import com.revature.util.SortByScoreValue;

@RestController
@RequestMapping("/score")
public class ScoreController
{
	@Autowired
	ScoreService scoreService;
	
	/*
	 * After each game concludes, a post request will send a score object to 
	 * be persisted
	 */
	@PostMapping("/add")
	public ResponseEntity<Score> addScore(@RequestBody Score score)
	{
		return ResponseEntity.ok(scoreService.save(score));
	}
	
	/*
	 * retrieve all the scores in the db and sort to get the top ?(50 max) scores
	 * 
	 */
	@GetMapping("/global")
	public ResponseEntity<List<Score>> getGlobalLeaderboard()
	{
		//retrieve all the scores
		List<Score> allScores = scoreService.findAll();
		//sort in ascending order by score value
		SortByScoreValue scoreComparator = new SortByScoreValue();
		Collections.sort((List<Score>) allScores,scoreComparator);
		//TODO:build a response for 50 json score objects
		
		return null;
	}
	
	@GetMapping("/friend")
	public ResponseEntity<Score> getFriendLeaderboard()
	{
		return null;
	}
	
}
