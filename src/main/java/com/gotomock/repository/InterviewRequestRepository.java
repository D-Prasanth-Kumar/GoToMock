package com.gotomock.repository;

import com.gotomock.model.InterviewRequest;
import com.gotomock.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRequestRepository extends JpaRepository<InterviewRequest, Long> {
    List<InterviewRequest> findByReceiver(User receiver);

    List<InterviewRequest> findBySender(User sender);
}
