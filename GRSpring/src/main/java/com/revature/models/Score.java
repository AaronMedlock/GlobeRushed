package com.revature.models;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/*
 * A score contains the integer score value,the user who scored it,
 * and the location they scored on
 * 
 * A leaderboard will be generated per request by querying the database for the top 50 scores
 * based on varying criteria e.g global, friends only
 */
@Entity
@Table(name="Scores")
public class Score 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long scoreId;
	int scoreValue;
	
	@ManyToOne
	@JoinColumn(name="user")
	User user;
	long latitude;
	long longitude;
	
	public Score(long scoreId, int scoreValue, User user, long latitude, long longitude)
	{
		super();
		this.scoreId = scoreId;
		this.scoreValue = scoreValue;
		this.user = user;
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public Score(int scoreValue, User user, long latitude, long longitude)
	{
		super();
		this.scoreValue = scoreValue;
		this.user = user;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	public long getScoreId()
	{
		return scoreId;
	}

	public void setScoreId(long scoreId)
	{
		this.scoreId = scoreId;
	}

	public int getScoreValue()
	{
		return scoreValue;
	}

	public void setScoreValue(int scoreValue)
	{
		this.scoreValue = scoreValue;
	}

	public User getUser()
	{
		return user;
	}

	public void setUser(User user)
	{
		this.user = user;
	}

	public long getLatitude()
	{
		return latitude;
	}

	public void setLatitude(long latitude)
	{
		this.latitude = latitude;
	}

	public long getLongitude()
	{
		return longitude;
	}

	public void setLongitude(long longitude)
	{
		this.longitude = longitude;
	}

	@Override
	public int hashCode()
	{
		return Objects.hash(latitude, longitude, scoreId, scoreValue, user);
	}

	@Override
	public boolean equals(Object obj)
	{
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Score other = (Score) obj;
		return latitude == other.latitude && longitude == other.longitude && scoreId == other.scoreId
				&& scoreValue == other.scoreValue && Objects.equals(user, other.user);
	}

	@Override
	public String toString()
	{
		return "Score [scoreId=" + scoreId + ", scoreValue=" + scoreValue + ", user=" + user + ", latitude=" + latitude
				+ ", longitude=" + longitude + "]";
	}
	
	
	
	
	
}
