package com.revature.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
