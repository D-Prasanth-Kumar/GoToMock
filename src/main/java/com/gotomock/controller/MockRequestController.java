package com.gotomock.controller;

import com.gotomock.enums.RequestStatus;
import com.gotomock.model.MockRequest;
import com.gotomock.service.MockRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class MockRequestController {
    private final MockRequestService mockRequestService;

    @Autowired
    public MockRequestController(MockRequestService mockeRequestService) {
        this.mockRequestService = mockeRequestService;
    }

    @PostMapping("/send")
    public ResponseEntity<MockRequest> sendRequest(@RequestParam Long senderId, @RequestParam Long receiverId) {
        MockRequest newRequest = mockRequestService.createRequest(senderId, receiverId);

        return ResponseEntity.ok(newRequest);
    }

    @GetMapping("/incoming/{receiverId}")
    public List<MockRequest> getIncoming(@PathVariable Long receiverId) {
        return mockRequestService.getIncomingRequests(receiverId);
    }

    @PatchMapping("/status/{requestId}")
    public ResponseEntity<MockRequest> updateStatus(@PathVariable Long requestId, @RequestParam RequestStatus status) {
        MockRequest updated = mockRequestService.updateRequestStatus(requestId, status);

        return ResponseEntity.ok(updated);
    }
}
