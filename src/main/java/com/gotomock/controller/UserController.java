package com.gotomock.controller;

import com.gotomock.dto.UserPatchDTO;
import com.gotomock.model.User;
import com.gotomock.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:5173", "https://gotomock.vercel.app"})
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/available")
    public List<User> getAvailableUsers(Authentication authentication) {
        return userService.getAllAvailableUsers(authentication.getName());
    }

    @GetMapping("/search")
    public List<User> searchBySkill(@RequestParam String skill,
                                    Authentication authentication) {
        return userService.searchUsersBySkill(skill, authentication.getName());
    }

    @PatchMapping("/partial_update/{id}")
    public ResponseEntity<User> patchProfile(@RequestBody UserPatchDTO patchData,
                                             Authentication authentication) {
        User updatedUser = userService.patchCurrentUser(authentication.getName(),
                                                        patchData);

        return ResponseEntity.ok(updatedUser);
    }
}
