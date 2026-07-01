package com.gotomock.websocket;

import org.springframework.web.socket.WebSocketSession;

public class InterviewParticipant {
    private final String username;
    private WebSocketSession session;
    private boolean cameraEnabled = true;
    private boolean microphoneEnabled = true;
    private boolean screenSharing = false;

    public InterviewParticipant(String username, WebSocketSession session) {
        this.username = username;
        this.session = session;
    }

    public String getUsername() {
        return username;
    }

    public WebSocketSession getSession() {
        return session;
    }

    public void setSession(WebSocketSession session) {
        this.session = session;
    }

    public boolean isCameraEnabled() {
        return cameraEnabled;
    }

    public void setCameraEnabled(boolean cameraEnabled) {
        this.cameraEnabled = cameraEnabled;
    }

    public boolean isMicrophoneEnabled() {
        return microphoneEnabled;
    }

    public void setMicrophoneEnabled(boolean microphoneEnabled) {
        this.microphoneEnabled = microphoneEnabled;
    }

    public boolean isScreenSharing() {
        return screenSharing;
    }

    public void setScreenSharing(boolean screenSharing) {
        this.screenSharing = screenSharing;
    }
}
