package com.evoting.service;

import com.evoting.model.Election;
import com.evoting.repository.ElectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ElectionService {

    @Autowired
    private ElectionRepository electionRepository;

    public List<Election> getAllElections() {
        // In a real application, you might want to update statuses here based on dates
        return electionRepository.findAll();
    }

    public Election createElection(Election election) {
        // Set the initial status based on the start date
        if (election.getStartDate().isAfter(LocalDate.now())) {
            election.setStatus("Upcoming");
        } else {
            election.setStatus("Ongoing");
        }
        return electionRepository.save(election);
    }
}
