package com.evoting.controller;

import com.evoting.model.User;
import com.evoting.service.VoterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/voters")
@CrossOrigin(origins = "http://localhost:3000")
public class VoterController {

    @Autowired
    private VoterService voterService;

    @GetMapping
    public ResponseEntity<List<User>> getAllVoters() {
        List<User> voters = voterService.getAllVoters();
        return ResponseEntity.ok(voters);
    }
}
