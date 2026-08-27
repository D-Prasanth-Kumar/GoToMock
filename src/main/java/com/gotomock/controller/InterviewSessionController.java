package com.gotomock.controller;

import com.gotomock.model.InterviewSession;
import com.gotomock.service.InterviewSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/interviews")
public class InterviewSessionController {
    private final InterviewSessionService interviewSessionService;

    public InterviewSessionController(InterviewSessionService interviewSessionService) {
        this.interviewSessionService = interviewSessionService;
    }

    @GetMapping("/my-sessions")
    public ResponseEntity<List<InterviewSession>> getMySessions(Authentication authentication) {
        return ResponseEntity.ok(interviewSessionService.getMySessions(authentication.getName()));
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<InterviewSession> getSessionById(
            @PathVariable Long sessionId,
            Authentication authentication) {
        return ResponseEntity.ok(interviewSessionService.getSessionById(sessionId, authentication.getName()));
    }

}
