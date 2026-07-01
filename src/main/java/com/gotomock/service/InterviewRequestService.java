package com.gotomock.service;

import com.gotomock.dto.SendRequestDTO;
import com.gotomock.enums.RequestStatus;
import com.gotomock.model.InterviewRequest;
import com.gotomock.model.User;
import com.gotomock.repository.InterviewRequestRepository;
import com.gotomock.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewRequestService {
    private final InterviewRequestRepository interviewRequestRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final InterviewSessionService interviewSessionService;

    public InterviewRequestService(
            InterviewRequestRepository interviewRequestRepository,
            UserRepository userRepository,
            NotificationService notificationService,
            InterviewSessionService interviewSessionService
    ) {
        this.interviewRequestRepository = interviewRequestRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.interviewSessionService = interviewSessionService;
    }

    public InterviewRequest createRequest(String senderUsername, SendRequestDTO requestDTO) {
        User sender = userRepository
                        .findByUsername(senderUsername)
                        .orElseThrow(() -> new RuntimeException("Sender not found"));

        User receiver = userRepository
                        .findById(requestDTO.getReceiverId())
                        .orElseThrow(() -> new RuntimeException("Receiver not found"));

        if (!receiver.isVisible()) {
            throw new RuntimeException("This user is not accepting interview requests.");
        }

        if (sender.getId().equals(receiver.getId())) {
            throw new RuntimeException("You cannot send a request to yourself");
        }

        boolean alreadyPending = interviewRequestRepository.existsBySenderAndReceiverAndStatus(
                                        sender,
                                        receiver,
                                        RequestStatus.PENDING
                                );

        if (alreadyPending) {
            throw new RuntimeException("A Pending request already exists.");
        }

        InterviewRequest request = new InterviewRequest();
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setMessage(requestDTO.getMessage());
        request.setStatus(RequestStatus.PENDING);

        return interviewRequestRepository.save(request);
    }

    public List<InterviewRequest> getReceivedRequests(String username) {
        User receiver = userRepository.findByUsername(username)
                                      .orElseThrow(() -> new RuntimeException("not found"));

        return interviewRequestRepository.findByReceiver(receiver);
    }

    public List<InterviewRequest> getSentRequests(String username) {
        User sender = userRepository.findByUsername(username)
                                    .orElseThrow(() -> new RuntimeException("not found"));

        return interviewRequestRepository.findBySender(sender);
    }

    public InterviewRequest acceptRequest(Long requestId, String username) {
        InterviewRequest request = interviewRequestRepository.findById(requestId)
                                                             .orElseThrow(() ->new RuntimeException("Request not found"));

        if (!request.getReceiver().getUsername().equals(username)) {
            throw new RuntimeException("You are not allowed to process this request.");
        }

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new RuntimeException("This request has already been processed.");
        }

        if (request.getSender().getId().equals(request.getReceiver().getId())) {
            throw new RuntimeException("Invalid Interview request.");
        }

        request.setStatus(RequestStatus.ACCEPTED);
        notificationService.createNotification(request.getSender(),
                                               request.getReceiver().getName()
                                                       + " accepted your interview request.");
        interviewSessionService.createSession(request);

        return interviewRequestRepository.save(request);
    }

    public InterviewRequest rejectRequest(Long requestId, String username) {
        InterviewRequest request = interviewRequestRepository.findById(requestId)
                                                             .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!request.getReceiver().getUsername().equals(username)) {
            throw new RuntimeException("You are not allowed to process this request.");
        }

        if (request.getStatus() != RequestStatus.PENDING) {
            throw new RuntimeException("This request has already been processed.");
        }

        request.setStatus(RequestStatus.REJECTED);
        notificationService.createNotification(request.getSender(),
                                               request.getSender().getName()
                                                       + " rejected your interview request");

        return interviewRequestRepository.save(request);
    }
}
