package com.example.todo.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.todo.model.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>{
	UserEntity findByEmail(String email);
	///
	Optional<UserEntity> findById(String Id);
	///
	Boolean existsByEmail(String email);
	UserEntity findByEmailAndPassword(String email, String password);

}
