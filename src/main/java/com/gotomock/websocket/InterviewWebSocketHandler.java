package com.gotomock.websocket;

import com.gotomock.websocket.dto.SignalMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

@Component
public class InterviewWebSocketHandler extends TextWebSocketHandler {
    private final InterviewRoomManager roomManager;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public InterviewWebSocketHandler(InterviewRoomManager roomManager) {
        this.roomManager = roomManager;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("Connected: " + session.getId());
    }

    private void forwardToPartner(WebSocketSession session,
                                  SignalMessage message) throws IOException {
        InterviewRoom room = roomManager.getRoom(message.getSessionId());

        if (room == null) {
            return;
        }

        String username = (String) session.getAttributes().get("username");

        InterviewParticipant partner = room.getOtherParticipant(username);

        if (partner == null) {
            return;
        }

        message.setSender(username);

        System.out.println(
                message.getType()
                        + " forwarded from "
                        + username
                        + " to "
                        + partner.getUsername()
        );

        sendMessage(partner.getSession(), message);
    }

    private void handleLeave(WebSocketSession session,
                             SignalMessage message) throws IOException {
        InterviewRoom room = roomManager.getRoom(message.getSessionId());

        if (room == null) {
            return;
        }

        String username = (String) session.getAttributes().get("username");

        InterviewParticipant partner = room.getOtherParticipant(username);
        room.removeParticipant(username);

        if (partner != null) {
            SignalMessage response = new SignalMessage();
            response.setType("PARTNER_LEFT");
            response.setSessionId(message.getSessionId());

            sendMessage(partner.getSession(), response);
        }

        if (room.isEmpty()) {
            roomManager.removeRoom(message.getSessionId());
        }

        System.out.println(username + " left interview.");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session,
                                     TextMessage message) throws Exception {
        SignalMessage signalMessage;

        try {
            signalMessage = objectMapper.readValue(message.getPayload(), SignalMessage.class);
        } catch (Exception e) {
            System.out.println("Failed to parse message from session " + session.getId() + ": " + e.getMessage());
            return;
        }

        if (signalMessage.getType() == null) {
            System.out.println("Received message with null type from session " + session.getId());
            return;
        }

        switch (signalMessage.getType()) {
            case "JOIN":
                handleJoin(session, signalMessage);
                break;
            case "OFFER":
                forwardToPartner(session, signalMessage);
                break;
            case "ANSWER":
                forwardToPartner(session, signalMessage);
                break;
            case "ICE_CANDIDATE":
                forwardToPartner(session, signalMessage);
                break;
            case "CAMERA":
                forwardToPartner(session, signalMessage);
                break;
            case "MIC":
                forwardToPartner(session, signalMessage);
                break;
            case "SCREEN_SHARE":
                forwardToPartner(session, signalMessage);
                break;
            case "LEAVE":
                handleLeave(session, signalMessage);
                break;
            default:
                System.out.println("Unknown message type: " + signalMessage.getType());
        }
    }

    private void handleJoin(WebSocketSession session,
                            SignalMessage message) throws IOException {
        InterviewRoom room = roomManager.getOrCreateRoom(message.getSessionId());

        String username = (String) session.getAttributes().get("username");

        InterviewParticipant currentParticipant = new InterviewParticipant(username, session);
        room.addParticipant(currentParticipant);

        session.getAttributes().put("sessionId",
                                     message.getSessionId());

        System.out.println(username + " joined interview " + message.getSessionId());
        System.out.println("Participants: " + room.getParticipants().size());

        if (room.isFull()) {
            SignalMessage response = new SignalMessage();
            response.setType("PARTNER_JOINED");
            response.setSessionId(message.getSessionId());

            for (InterviewParticipant participant : room.getParticipants()) {
                if (!participant.getUsername().equals(username)) {
                    sendMessage(participant.getSession(), response);
                }
            }
        }
    }

    private void sendMessage(WebSocketSession session,
                             SignalMessage message) throws IOException {
        String json = objectMapper.writeValueAsString(message);
        session.sendMessage(new TextMessage(json));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session,
                                      CloseStatus status) throws Exception {
        String username = (String) session.getAttributes().get("username");
        Long sessionId = (Long) session.getAttributes().get("sessionId");

        System.out.println(username + " disconnected. Status: " + status);

        if (sessionId == null) return;

        InterviewRoom room = roomManager.getRoom(sessionId);
        if (room == null) return;

        InterviewParticipant partner = room.getOtherParticipant(username);
        room.removeParticipant(username);

        if (partner != null) {
            try {
                SignalMessage response = new SignalMessage();
                response.setType("PARTNER_LEFT");
                response.setSessionId(sessionId);
                sendMessage(partner.getSession(), response);
            } catch (Exception e) {
                System.out.println("Could not notify partner of disconnect: " + e.getMessage());
            }
        }

        if (room.isEmpty()) {
            roomManager.removeRoom(sessionId);
            System.out.println("Room " + sessionId + " removed.");
        }
    }
}
