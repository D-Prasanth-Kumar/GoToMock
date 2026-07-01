package com.gotomock.websocket;

import com.gotomock.service.CustomUserDetailsService;
import com.gotomock.service.JwtService;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Component
public class JwtHandshakeInterceptor implements HandshakeInterceptor {
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtHandshakeInterceptor(JwtService jwtService,
                                   CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request,
                                   ServerHttpResponse response,
                                   WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) throws Exception {
        if (!(request instanceof ServletServerHttpRequest servletRequest)) {
            return false;
        }

        String token = servletRequest
                        .getServletRequest()
                        .getParameter("token");

        if (token == null || token.isBlank()) {
            return false;
        }

        String username = jwtService.extractUsername(token);

        if (username == null) {
            return false;
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (!jwtService.isTokenValid(token, userDetails.getUsername())) {
            return false;
        }

        attributes.put("username", username);

        return true;
    }

    public void afterHandshake(ServerHttpRequest request,
                               ServerHttpResponse respones,
                               WebSocketHandler wsHandler,
                               Exception exception) {

    }
}
