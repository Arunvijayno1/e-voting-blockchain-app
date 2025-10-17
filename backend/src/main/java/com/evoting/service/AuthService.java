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
        // Find user by email and verify password
        try {
            java.util.Optional<User> opt = userRepository.findByEmail(email);
            if (opt.isPresent()) {
                User user = opt.get();
                if (passwordEncoder.matches(password, user.getPassword())) {
                    // Do not expose the hashed password to callers
                    user.setPassword(null);
                    return user;
                } else {
                    throw new Exception("Invalid credentials");
                }
            } else {
                throw new Exception("User not found");
            }
        } catch (Exception e) {
            // Re-throw to let the controller translate to an appropriate HTTP response
            throw new RuntimeException(e.getMessage(), e);
        }
    }
}
