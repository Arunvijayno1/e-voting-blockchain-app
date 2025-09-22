package com.evoting.service;

import com.evoting.model.User;
import com.evoting.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // Use Spring Security's password encoder
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User newUser) throws Exception {
        // Check if user with the same email already exists
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            throw new Exception("User with email " + newUser.getEmail() + " already exists.");
        }

        // --- IMPORTANT SECURITY STEP: Hash the password before saving ---
        String hashedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(hashedPassword);

        // Save the new user to the database
        return userRepository.save(newUser);
    }

    public User loginUser(String email, String password) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loginUser'");
    }
}
