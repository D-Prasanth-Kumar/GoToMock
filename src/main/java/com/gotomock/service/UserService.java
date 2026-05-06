package com.gotomock.service;

import com.gotomock.model.User;
import com.gotomock.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {

        if(userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }
        return userRepository.save(user);
    }

    public List<User> getAllAvailableUsers() {

        return userRepository.findAll();
    }
}
