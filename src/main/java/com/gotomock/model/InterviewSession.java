package com.gotomock.model;

import com.gotomock.enums.InterviewSessionStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class InterviewSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User interviewer;

    @ManyToOne
    private User candidate;

    @OneToOne
    private InterviewRequest request;

    @Enumerated(EnumType.STRING)
    private InterviewSessionStatus status;

    private LocalDateTime createdAt;

    public InterviewSession() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getInterviewer() {
        return interviewer;
    }

    public void setInterviewer(User interviewer) {
        this.interviewer = interviewer;
    }

    public User getCandidate() {
        return candidate;
    }

    public void setCandidate(User candidate) {
        this.candidate = candidate;
    }

    public InterviewRequest getRequest() {
        return request;
    }

    public void setRequest(InterviewRequest request) {
        this.request = request;
    }

    public InterviewSessionStatus getStatus() {
        return status;
    }

    public void setStatus(InterviewSessionStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
