package com.evoting.service;

import com.evoting.model.Candidate;
import com.evoting.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Candidate addCandidate(Candidate candidate) {
        // In a real application, you'd add validation here
        return candidateRepository.save(candidate);
    }
}
