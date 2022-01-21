package com.revature.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String username;
	private String password;
	private String email;
	//List<User> friendList;/
	private List<String> friendlist = new ArrayList<String>();

	public User() 
	{
		super();
	}
	
	public User(int id, String username, String password, String email,List<String> friendlist)
	{
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.friendlist = friendlist;
	}

	public User(int id, String username, String password) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
	}
	public User(String username,String password,String email)
	{
		super();
		this.username = username;
		this.password = password;
		this.email = email;
	}

	public User(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	
	
//	public List<User> getFriendList()
//	{
//		return friendList;
//	}
//
//	public void setFriendList(List<User> friendList)
//	{
//		this.friendList = friendList;
//	}
	
	public List<String> getFriendlist() {
		return friendlist;
	}

	public void setFriendlist(List<String> friendlist) {
		this.friendlist = friendlist;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword()
	{
		return password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public String getEmail()
	{
		return email;
	}

	public void setEmail(String email)
	{
		this.email = email;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password 
				 + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, password, username);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return Objects.equals(id, other.id) && Objects.equals(password, other.password)
				&& Objects.equals(username, other.username);
	}
	 
	 

}
