package com.gotomock.websocket;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class InterviewRoom {
    private final Long sessionId;
    private final Map<String, InterviewParticipant> participants = new ConcurrentHashMap<>();

    public InterviewRoom(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void addParticipant(InterviewParticipant participant) {
        participants.put(participant.getUsername(), participant);
    }

    public void removeParticipant(String username) {
        participants.remove(username);
    }

    public InterviewParticipant getParticipant(String username) {
        return participants.get(username);
    }

    public Collection<InterviewParticipant> getParticipants() {
        return participants.values();
    }

    public boolean isEmpty() {
        return participants.isEmpty();
    }

    public boolean isFull() {
        return participants.size() == 2;
    }

    public InterviewParticipant getOtherParticipant(String username) {
        return participants.values()
                .stream()
                .filter(p -> !p.getUsername().equals(username))
                .findFirst()
                .orElse(null);
    }
}
