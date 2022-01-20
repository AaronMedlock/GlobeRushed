package com.revature.util;

import java.util.Comparator;

import com.revature.models.Score;

public class SortByScoreValue implements Comparator<Score>
{

	@Override
	public int compare(Score o1, Score o2)
	{
		
		return Integer.compare(o1.getScoreValue() , o2.getScoreValue());
	}
	
}