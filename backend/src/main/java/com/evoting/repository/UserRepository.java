package com.evoting.repository;

import com.evoting.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Finds a user by their email address
    Optional<User> findByEmail(String email);

    // Finds all users with a specific role (e.g., "Voter")
    List<User> findByRole(String role);
}

