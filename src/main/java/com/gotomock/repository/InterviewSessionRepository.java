package com.gotomock.repository;

import com.gotomock.model.InterviewSession;
import com.gotomock.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long> {
    List<InterviewSession> findByCandidate(User candidate);

    List<InterviewSession> findByInterviewer(User interviewer);
}
