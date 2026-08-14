package com.gotomock.model;

import com.gotomock.enums.MessageSender;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class InterviewMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private InterviewSession session;

    @Enumerated(EnumType.STRING)
    private MessageSender sender;

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDateTime createdAt;

    public InterviewMessage() {

    }

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public InterviewSession getSession() {
        return session;
    }

    public void setSession(InterviewSession session) {
        this.session = session;
    }

    public MessageSender getSender() {
        return sender;
    }

    public void setSender(MessageSender sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
