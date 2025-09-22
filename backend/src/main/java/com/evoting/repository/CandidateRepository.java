package com.evoting.repository;

import com.evoting.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    // Spring Data JPA automatically provides methods like findAll(), save(), etc.
}
