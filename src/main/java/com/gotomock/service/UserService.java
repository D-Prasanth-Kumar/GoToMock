package com.gotomock.service;

import com.gotomock.dto.UserPatchDTO;
import com.gotomock.model.User;
import com.gotomock.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllAvailableUsers() {
        return userRepository.findByIsVisibleTrue();
    }

    public List<User> searchUsersBySkill(String skill) {
        if (skill == null || skill.isEmpty()) {
            return userRepository.findByIsVisibleTrue();
        }

        return userRepository.findBySkillsContainingIgnoreCaseAndIsVisibleTrue(skill);
    }

    public User patchUserProfile(Long id, UserPatchDTO patchData) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (patchData.getName() != null) {
            existingUser.setName(patchData.getName());
        }

        if (patchData.getSkills() != null) {
            existingUser.setSkills(patchData.getSkills());
        }

        if (patchData.getIsVisible() != null) {
            existingUser.setVisible(patchData.getIsVisible());
        }

        return userRepository.save(existingUser);
    }
}
