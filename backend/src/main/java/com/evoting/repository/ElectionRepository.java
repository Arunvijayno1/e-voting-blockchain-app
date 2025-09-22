package com.evoting.repository;

import com.evoting.model.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {
    // Basic CRUD methods are inherited from JpaRepository
}
