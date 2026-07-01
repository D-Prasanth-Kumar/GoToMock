package com.gotomock.config;

import com.gotomock.websocket.InterviewWebSocketHandler;
import com.gotomock.websocket.JwtHandshakeInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final InterviewWebSocketHandler interviewWebSocketHandler;
    private final JwtHandshakeInterceptor jwtHandshakeInterceptor;

    public WebSocketConfig(InterviewWebSocketHandler interviewWebSocketHandler,
                           JwtHandshakeInterceptor jwtHandshakeInterceptor) {
        this.interviewWebSocketHandler = interviewWebSocketHandler;
        this.jwtHandshakeInterceptor = jwtHandshakeInterceptor;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(
                interviewWebSocketHandler,
                "/ws/interview"
        ).addInterceptors(jwtHandshakeInterceptor)
                .setAllowedOrigins("http://localhost:5173");
    }
}
