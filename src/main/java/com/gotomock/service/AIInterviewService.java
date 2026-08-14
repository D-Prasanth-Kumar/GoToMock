package com.gotomock.service;

import com.gotomock.dto.StartAIInterviewRequestDTO;
import com.gotomock.enums.InterviewType;
import com.gotomock.model.InterviewSession;
import com.gotomock.model.User;
import org.springframework.stereotype.Service;

@Service
public class AIInterviewService {
    private final UserService userService;
    private final InterviewSessionService interviewSessionService;

    public AIInterviewService(UserService userService,
                              InterviewSessionService interviewSessionService) {
        this.userService = userService;
        this.interviewSessionService = interviewSessionService;
    }

    public InterviewSession startInterview(String username,
                                           StartAIInterviewRequestDTO request) {
        User candidate = userService.getUserByUsername(username);

        return interviewSessionService.createSession(candidate,
                                                    null,
                                                    null,
                                                     InterviewType.AI);
    }
}
