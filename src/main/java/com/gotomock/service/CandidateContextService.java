package com.gotomock.service;

import com.gotomock.context.CandidateContext;
import com.gotomock.model.InterviewSession;
import org.springframework.stereotype.Service;

@Service
public class CandidateContextService {
    public CandidateContext buildContext(InterviewSession session) {
        CandidateContext context = new CandidateContext();

        return context;
    }
}
