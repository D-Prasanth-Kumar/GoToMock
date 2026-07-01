package com.gotomock.websocket;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class InterviewRoomManager {
    private final Map<Long, InterviewRoom> rooms = new ConcurrentHashMap<>();

    public InterviewRoom createRoom(Long sessionId) {
        InterviewRoom room = new InterviewRoom(sessionId);
        rooms.put(sessionId, room);

        return room;
    }

    public InterviewRoom getRoom(Long sessionId) {
        return rooms.get(sessionId);
    }

    public InterviewRoom getOrCreateRoom(Long sessionId) {
        return rooms.computeIfAbsent(sessionId, InterviewRoom::new);
    }

    public void removeRoom(Long sessionId) {
        rooms.remove(sessionId);
    }

    public boolean roomExists(Long sessionId) {
        return rooms.containsKey(sessionId);
    }
}
