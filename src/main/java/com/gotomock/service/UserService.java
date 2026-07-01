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

    public List<User> getAllAvailableUsers(String username) {
        User currentUser = getUserByUsername(username);

        return userRepository.findByIsVisibleTrue()
                             .stream()
                             .filter(user -> !user.getId().equals(currentUser.getId()))
                             .toList();
    }

    public List<User> searchUsersBySkill(String skill, String username) {
        User currentUser = getUserByUsername(username);

        List<User> users;

        if (skill == null || skill.isBlank()) {
            users = userRepository.findByIsVisibleTrue();
        } else {
            users = userRepository.findBySkillsContainingIgnoreCaseAndIsVisibleTrue(skill);
        }

        return users.stream()
                .filter(user -> !user.getId().equals(currentUser.getId()))
                .toList();
    }

    public User patchCurrentUser(String username, UserPatchDTO patchData) {
        User existingUser = getUserByUsername(username);

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
