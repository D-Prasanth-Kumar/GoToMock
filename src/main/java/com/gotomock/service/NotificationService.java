package com.gotomock.service;

import com.gotomock.model.Notification;
import com.gotomock.model.User;
import com.gotomock.repository.NotificationRepository;
import com.gotomock.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository,
                               UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public Notification createNotification(User receiver, String message) {
        Notification notification = new Notification();
        notification.setReceiver(receiver);
        notification.setMessage(message);
        notification.setRead(false);

        return notificationRepository.save(notification);
    }

    public List<Notification> getMyNotifications(String username) {
        User user = userRepository.findByUsername(username)
                                  .orElseThrow(() -> new RuntimeException("User not found"));

        return notificationRepository.findByReceiverOrderByCreatedAtDesc(user);
    }
}
