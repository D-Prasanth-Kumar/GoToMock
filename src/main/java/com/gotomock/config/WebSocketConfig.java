package com.gotomock.config;

import com.gotomock.websocket.InterviewWebSocketHandler;
import com.gotomock.websocket.JwtHandshakeInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final InterviewWebSocketHandler interviewWebSocketHandler;
    private final JwtHandshakeInterceptor jwtHandshakeInterceptor;

    @Value("${app.local.frontend}")
    private String localFrontend;

    @Value("${app.production.frontend}")
    private String productionFrontend;

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
                .setAllowedOrigins(localFrontend, productionFrontend);
    }
}
