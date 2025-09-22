package com.evoting.service;

import com.evoting.model.User;
import com.evoting.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoterService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllVoters() {
        // This method finds all users who have the role of "Voter".
        return userRepository.findByRole("Voter");
    }
}

