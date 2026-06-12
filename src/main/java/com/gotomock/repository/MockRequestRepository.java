package com.gotomock.repository;

import com.gotomock.enums.RequestStatus;
import com.gotomock.model.MockRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MockRequestRepository extends JpaRepository<MockRequest, Long> {
    List<MockRequest> findByReceiverId(Long receiverId);

    boolean existsBySenderIdAndReceiverIdAndStatus(Long senderId, Long receiverId, RequestStatus status);
}
