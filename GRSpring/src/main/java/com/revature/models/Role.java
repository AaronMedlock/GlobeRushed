package com.revature.models;

import java.util.Objects;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "role")
public class Role
{

	private Long id;

	private String name;

	private Set<User> users;

	public Role()
	{

	}

	public Role(Long id, String name, Set<User> users)
	{
		super();
		this.id = id;
		this.name = name;
		this.users = users;
	}

	public Role(String name, Set<User> users)
	{
		super();
		this.name = name;
		this.users = users;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	@ManyToMany(mappedBy = "roles")
	public Set<User> getUsers()
	{
		return users;
	}

	public void setUsers(Set<User> users)
	{
		this.users = users;
	}

	@Override
	public String toString()
	{
		return "Role [id=" + id + ", name=" + name + ", users=" + users + "]";
	}

	@Override
	public int hashCode()
	{
		return Objects.hash(id, name, users);
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
		Role other = (Role) obj;
		return Objects.equals(id, other.id) && Objects.equals(name, other.name) && Objects.equals(users, other.users);
	}

}
