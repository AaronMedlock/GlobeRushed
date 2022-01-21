package com.revature.web;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Score;
import com.revature.models.User;
import com.revature.service.ScoreService;
import com.revature.service.UserService;
import com.revature.util.SortByScoreValue;

@RestController
@RequestMapping("/score")
public class ScoreController
{
	@Autowired
	private ScoreService scoreService;
	
	@Autowired 
	private UserService userService;
	
	/*
	 * After each game concludes, a post request will send a score object to 
	 * be persisted
	 */
	@PostMapping("/add")
	public ResponseEntity<Score> addScore(@RequestBody Map<String,String> json)
	{
		User currentUser = userService.findByUsername(json.get("username"));
		Integer scoreValue = (Integer.valueOf(json.get("score_value")));
		Long latitude = Long.valueOf(json.get("latitude"));
		Long longitude = Long.valueOf(json.get("longitude"));
		
		Score newScore = new Score(scoreValue,currentUser,latitude,longitude);
		
		return ResponseEntity.ok(scoreService.save(newScore));
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
		Collections.reverse(allScores);
		//build a list of only the first 50 scores
		List<Score> topScores;
		if(allScores.size() < 50)
		{
			topScores = allScores.subList(0, allScores.size());
		}
		else
		{
			topScores = allScores.subList(0, 50);
		}
		//send list as a response
		return ResponseEntity.ok(topScores);
	}
	
	/*
	 * get the username of the current, send back the scores of his friends list
	 * sort descending 50 max 
	 */
	@GetMapping("/friendlist/{username}")
	public ResponseEntity<List<Score>> getFriendListScores(@PathVariable("username") String username)
	{
		User currentUser = userService.findByUsername(username);
		List<String> userFriends = currentUser.getFriendList(); //List of all friend's usernames
		//List<Integer> friendLeaderBoard = new ArrayList<Score>(); //find each friend, sum all their scores, add to list
		for(String s : userFriends)
		{
			Integer friendSum = 0; //sum variable
			User thisFriend = userService.findByUsername(s); //grab friend's User object
			List<Score> friendScores = scoreService.findByUser(thisFriend); //get friend's Scores
			for(Score score: friendScores) //iterate through friend's scores and add the value to sum
			{
				friendSum += score.getScoreValue();
			}
			//add the sum to the list
			//TODO not finished!!
			
		}
		return null;	
	}
	
	/*
	 * take username, return total sum of scores by user
	 * TODO test this
	 */
	@GetMapping("/user/{username}")
	public ResponseEntity<Integer> getUserScoreSum(@PathVariable("username") String username)
	{
		User currentUser = userService.findByUsername(username);
		List<Score> userScores = scoreService.findByUser(currentUser);
		Integer sumScore = 0;
		for(Score s : userScores)
		{
			sumScore += s.getScoreValue();
		}
		return ResponseEntity.ok(sumScore);
	}
	
	
}
