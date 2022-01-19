package com.revature.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Score;
import com.revature.models.User;

@Repository
public interface ScoreRepository extends JpaRepository<User, Integer>
{
	public List<Score> findByUser(User user);
	//Optional<Score> findScoreByLocation(long latitude,long longitude); not in jpa repo
	Optional<Score> findAllScores();
	Score save(Score score);
}
