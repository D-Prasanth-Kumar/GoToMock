package com.gotomock.controller;

import com.gotomock.dto.UserPatchDTO;
import com.gotomock.model.User;
import com.gotomock.service.UserService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody User user) {
        User savedUser = userService.registerUser(user);

        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/available")
    public List<User> getAvailableUsers() {
        return userService.getAllAvailableUsers();
    }

    @GetMapping("/search")
    public List<User> searchBySkill(@RequestParam String skill) {
        return userService.searchUsersBySkill(skill);
    }

    @PatchMapping("/partial_update/{id}")
    public ResponseEntity<User> patchProfile(@PathVariable Long id, @RequestBody UserPatchDTO patchData) {

        User updatedUser = userService.patchUserProfile(id, patchData);

        return ResponseEntity.ok(updatedUser);
    }

}
