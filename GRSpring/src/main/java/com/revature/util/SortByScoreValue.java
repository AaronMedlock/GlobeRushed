package com.revature.util;

import java.util.Comparator;

import com.revature.models.User;

public class SortByScoreValue implements Comparator<User>
{

	@Override
	public int compare(User o1, User o2)
	{	
		return Integer.compare(o1.getScoreTotal() , o2.getScoreTotal());
	}
	
}