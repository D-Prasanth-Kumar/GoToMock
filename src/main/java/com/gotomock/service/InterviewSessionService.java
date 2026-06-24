package com.gotomock.service;

import com.gotomock.enums.InterviewSessionStatus;
import com.gotomock.enums.RequestStatus;
import com.gotomock.model.InterviewRequest;
import com.gotomock.model.InterviewSession;
import com.gotomock.model.User;
import com.gotomock.repository.InterviewSessionRepository;
import com.gotomock.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InterviewSessionService {
    private final InterviewSessionRepository interviewSessionRepository;
    private final UserRepository userRepository;

    public InterviewSessionService(InterviewSessionRepository interviewSessionRepository,
                                   UserRepository userRepository) {
        this.interviewSessionRepository = interviewSessionRepository;
        this.userRepository = userRepository;
    }

    public InterviewSession createSession(InterviewRequest request) {
        InterviewSession session = new InterviewSession();
        session.setRequest(request);
        session.setCandidate(request.getSender());
        session.setInterviewer(request.getReceiver());
        session.setStatus(InterviewSessionStatus.READY);

        return interviewSessionRepository.save(session);
    }

    public List<InterviewSession> getMySessions(String username) {
        User user = userRepository.findByUsername(username)
                                  .orElseThrow(() -> new RuntimeException("User not found"));

        List<InterviewSession> sessions = new ArrayList<>();
        sessions.addAll(interviewSessionRepository.findByCandidate(user));
        sessions.addAll(interviewSessionRepository.findByInterviewer(user));

        return sessions;
    }
}
