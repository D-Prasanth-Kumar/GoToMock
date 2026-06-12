package com.gotomock.service;

import com.gotomock.enums.RequestStatus;
import com.gotomock.model.MockRequest;
import com.gotomock.model.User;
import com.gotomock.repository.MockRequestRepository;
import com.gotomock.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MockRequestService {
    private final MockRequestRepository mockRequestRepository;
    private final UserRepository userRepository;

    public MockRequestService(MockRequestRepository mockRequestRepository, UserRepository userRepository) {
        this.mockRequestRepository = mockRequestRepository;
        this.userRepository = userRepository;
    }

    public MockRequest createRequest(Long senderId, Long receiverId) {
        if (senderId.equals(receiverId)) {
            throw new RuntimeException("You cannot send a mock request to yourself");
        }

        boolean pendingRequestExists = mockRequestRepository.existsBySenderIdAndReceiverIdAndStatus(senderId, receiverId, RequestStatus.PENDING);

        if (pendingRequestExists) {
            throw new RuntimeException("A pending request already exists for this user.");
        }

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        MockRequest request = new MockRequest(sender, receiver);

        return mockRequestRepository.save(request);
    }

    public List<MockRequest> getIncomingRequests(Long receiverId) {
        return mockRequestRepository.findByReceiverId(receiverId);
    }

    public MockRequest updateRequestStatus(Long requestId, RequestStatus newStatus) {
        MockRequest request = mockRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        request.setStatus(newStatus);

        return mockRequestRepository.save(request);
    }
}
