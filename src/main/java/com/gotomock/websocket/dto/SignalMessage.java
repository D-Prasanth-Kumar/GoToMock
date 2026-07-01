package com.gotomock.websocket.dto;

public class SignalMessage {
    private String type;
    private Long sessionId;
    private String sender;
    private String target;

    private Object offer;
    private Object answer;
    private Object candidate;

    private Boolean cameraEnabled;
    private Boolean micEnabled;
    private Boolean screenSharing;
    private String chatMessage;

    public SignalMessage() {

    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Object getOffer() {
        return offer;
    }

    public void setOffer(Object offer) {
        this.offer = offer;
    }

    public Object getAnswer() {
        return answer;
    }

    public void setAnswer(Object answer) {
        this.answer = answer;
    }

    public Object getCandidate() {
        return candidate;
    }

    public void setCandidate(Object candidate) {
        this.candidate = candidate;
    }

    public Boolean getCameraEnabled() {
        return cameraEnabled;
    }

    public void setCameraEnabled(Boolean cameraEnabled) {
        this.cameraEnabled = cameraEnabled;
    }

    public Boolean getMicEnabled() {
        return micEnabled;
    }

    public void setMicEnabled(Boolean micEnabled) {
        this.micEnabled = micEnabled;
    }

    public Boolean getScreenSharing() {
        return screenSharing;
    }

    public void setScreenSharing(Boolean screenSharing) {
        this.screenSharing = screenSharing;
    }

    public String getChatMessage() {
        return chatMessage;
    }

    public void setChatMessage(String chatMessage) {
        this.chatMessage = chatMessage;
    }
}
