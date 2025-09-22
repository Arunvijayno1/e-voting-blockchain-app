package com.evoting.repository;

import com.evoting.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    // Spring Data JPA will automatically provide methods like save(), findById(), findAll(), etc.
    // You can add custom query methods here if needed later.
}

