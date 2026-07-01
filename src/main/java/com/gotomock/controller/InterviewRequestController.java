package com.gotomock.controller;

import com.gotomock.dto.SendRequestDTO;
import com.gotomock.model.InterviewRequest;
import com.gotomock.service.InterviewRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
public class InterviewRequestController {
    private final InterviewRequestService interviewRequestService;

    public InterviewRequestController(InterviewRequestService interviewRequestService) {
        this.interviewRequestService = interviewRequestService;
    }

    @PostMapping
    public ResponseEntity<InterviewRequest> sendRequest(@RequestBody SendRequestDTO requestDTO,
                                                        Authentication authentication) {
        InterviewRequest request = interviewRequestService.createRequest(authentication.getName(), requestDTO);

        return ResponseEntity.ok(request);
    }

    @GetMapping("/received")
    public ResponseEntity<List<InterviewRequest>> getReceivedRequests(Authentication authentication) {
        return ResponseEntity.ok(interviewRequestService.getReceivedRequests(authentication.getName()));
    }

    @GetMapping("/sent")
    public ResponseEntity<List<InterviewRequest>> getSentRequests(Authentication authentication) {
        return ResponseEntity.ok(interviewRequestService.getSentRequests(authentication.getName()));
    }

    @PatchMapping("/{id}/accept")
    public ResponseEntity<InterviewRequest> acceptRequest(@PathVariable Long id,
                                                          Authentication authentication) {
        return ResponseEntity.ok(interviewRequestService.acceptRequest(id, authentication.getName()));
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<InterviewRequest> rejectRequest(@PathVariable Long id,
                                                          Authentication authentication) {
        return ResponseEntity.ok(interviewRequestService.rejectRequest(id, authentication.getName()));
    }
}
