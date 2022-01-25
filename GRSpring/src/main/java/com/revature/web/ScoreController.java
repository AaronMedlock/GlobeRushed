package com.revature.web;

import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@RestController
@RequestMapping("/score")
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
		//Long latitude = Long.valueOf(json.get("latitude"));
		//Long longitude = Long.valueOf(json.get("longitude"));
		
		Score newScore = new Score(scoreValue,currentUser);
		
		return ResponseEntity.ok(scoreService.save(newScore));
	}
	
	/*
	 * retrieve all the scores in the db and sort to get the top ?(50 max) scores
	 * 
	 */
	@GetMapping("/global")
	public ResponseEntity<Map<String,Integer>> getGlobalLeaderboard() //TODO change to lifetime score
	{
		//retrieve all the users
		List<User> allUsers = userService.findAll();
		Map<String,Integer> unsortedScores = new HashMap<String,Integer>();
		//sum all scores by user
		for(User currentUser : allUsers)
		{
			List<Score> allUserScores = scoreService.findByUser(currentUser);
			Integer scoreSum = 0;
			for(Score thisScore: allUserScores)
			{
				scoreSum += thisScore.getScoreValue();
			}
			unsortedScores.put(currentUser.getUsername(), scoreSum);
		}
		//all users in map, sort descending
		Map<String,Integer> globalLeaderboard = unsortedScores.entrySet().stream()
				.sorted(Collections.reverseOrder(Map.Entry.comparingByValue())).limit(50)
				.collect(Collectors.toMap(Map.Entry::getKey,Map.Entry::getValue, (e1,e2) -> e1, LinkedHashMap::new));
		
		//send list as a response
		return ResponseEntity.ok(globalLeaderboard);
	}
	
	/*
	 * get the username of the current, send back the scores of his friends list
	 * sort descending 50 max 
	 */
	@GetMapping("/friendlist/{username}")
	public ResponseEntity<List<User>> getFriendListScores(@PathVariable("username") String username)
	{	
		User currentUser = userService.findByUsername(username);
		List<String> userFriends = currentUser.getFriendList(); 
		List<User> friendListAsUser = new LinkedList<User>();
		
		for(String friendName : userFriends)
		{
			User thisFriend = userService.findByUsername(friendName); 
			friendListAsUser.add(thisFriend);
			
			Integer friendSum = 0; //sum variable
			//grab friend's User object
			
			//get friend's Scores
			List<Score> friendScores = scoreService.findByUser(thisFriend); 
			
			//iterate through friend's scores and add the value to sum
			for(Score score: friendScores) 
			{
				friendSum += score.getScoreValue();
			}
			
			//add the sum to the list
			userService.updateScore(friendSum, thisFriend.getUsername());			
		}
		//send a map of values <Username,friendSum>
		return ResponseEntity.ok(friendListAsUser);	
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
