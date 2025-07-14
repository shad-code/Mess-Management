package com.example.springstart.service;

import com.example.springstart.entity.Feedback;
import com.example.springstart.entity.User;
import com.example.springstart.enums.Role;
import com.example.springstart.repository.FeedbackRepository;
import com.example.springstart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserService userService;

    @Transactional
    @PreAuthorize("hasRole('ROLE_STUDENT') and hasAuthority('GIVE_FEEDBACK')")
    public Feedback createFeedback(Long userId, Feedback feedback) {
        User user = userService.getUserById(userId);

        if (user.getRole() != Role.STUDENT) {
            throw new RuntimeException("Only students can give feedback");
        }

        feedback.setUser(user);
        feedback.setCreatedAt(LocalDateTime.now());

        validateFeedback(feedback);

        return feedbackRepository.save(feedback);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') and hasAuthority('VIEW_FEEDBACK')")
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') and hasAuthority('VIEW_FEEDBACK')")
    public List<Feedback> getFeedbackByUserId(Long userId) {
        User user = userService.getUserById(userId);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return feedbackRepository.findByUser(user);
    }

    private void validateFeedback(Feedback feedback) {
        if (feedback.getRating() == null || feedback.getRating() < 1 || feedback.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }
        if (feedback.getFeedbackText() == null || feedback.getFeedbackText().trim().isEmpty()) {
            throw new RuntimeException("Feedback text is required");
        }
    }
}
