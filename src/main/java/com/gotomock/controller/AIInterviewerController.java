package com.gotomock.controller;

import com.gotomock.dto.StartAIInterviewRequestDTO;
import com.gotomock.model.InterviewSession;
import com.gotomock.service.AIInterviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai-interview")
public class AIInterviewerController {
    private final AIInterviewService aiInterviewService;

    public AIInterviewerController(AIInterviewService aiInterviewService) {
        this.aiInterviewService = aiInterviewService;
    }

    @PostMapping("/start")
    public ResponseEntity<InterviewSession> startInterview(@RequestBody StartAIInterviewRequestDTO request,
                                                           Authentication authentication) {
        InterviewSession session = aiInterviewService.startInterview(authentication.getName(), request);

        return ResponseEntity.ok(session);
    }
}
