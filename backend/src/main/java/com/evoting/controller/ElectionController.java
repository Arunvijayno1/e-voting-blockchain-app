package com.evoting.controller;

import com.evoting.model.Election;
import com.evoting.service.ElectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/elections")
@CrossOrigin(origins = "http://localhost:3000")
public class ElectionController {

    @Autowired
    private ElectionService electionService;

    @GetMapping
    public ResponseEntity<List<Election>> getAllElections() {
        List<Election> elections = electionService.getAllElections();
        return ResponseEntity.ok(elections);
    }

    @SuppressWarnings("null")
    @PostMapping("/create")
    public ResponseEntity<Election> createElection(@RequestBody Election election) {
        try {
            Election newElection = electionService.createElection(election);
            return new ResponseEntity<>(newElection, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

