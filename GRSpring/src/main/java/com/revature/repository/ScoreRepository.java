package com.revature.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Score;
import com.revature.models.User;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Integer>
{
	public List<Score> findByUser(User user);
	List<Score> findAll();
	Score save(Score score);
}
