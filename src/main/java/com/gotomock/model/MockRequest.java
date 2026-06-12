package com.gotomock.model;

import com.gotomock.enums.RequestStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Relational entity tracking the interaction and state of a peer-to-peer interview booking.
 * Maps to 'mock_requests' table and maintains physical foreign key paths back to the 'users' table.
 */
@Entity
@Table(name = "mock_requests")
public class MockRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Multiple individual interview requests can originate from a single unique user.
     * @JoinColumn explicitly names the physical Foreign Key column (sender_id) created in database.
     */
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    @NotNull(message = "Sender cannot be null")
    private User sender;

    /**
     * Multiple individual interview requests can target a single unique peer receiver.
     */
    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    @NotNull(message = "Receiver cannot be null")
    private User receiver;

    @NotNull(message = "Status cannot be null")
    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    public MockRequest() {
        this.status = RequestStatus.PENDING;    // new requests default to PENDING status
    }

    public MockRequest(User sender, User receiver) {
        this.sender = sender;
        this.receiver = receiver;
        this.status = RequestStatus.PENDING;
    }

    public Long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }
}
