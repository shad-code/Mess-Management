package com.example.springstart.controller;

import com.example.springstart.dto.FeedbackDTO;
import com.example.springstart.entity.Feedback;
import com.example.springstart.entity.User;
import com.example.springstart.enums.Role;
import com.example.springstart.mapper.FeedbackMapper;
import com.example.springstart.service.FeedbackService;
import com.example.springstart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private UserService userService;

    @Autowired
    private FeedbackMapper feedbackMapper;

    // Students can give feedback
    @PreAuthorize("hasAuthority('ROLE_STUDENT') or hasAuthority('GIVE_FEEDBACK')")
    @PostMapping("/student")
    public ResponseEntity<?> createFeedback(
            Authentication authentication,
            @RequestBody FeedbackDTO feedbackDTO
            ) {
        try {
            // Get logged-in user
            String email = authentication.getName();
            User student = userService.getUserByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (student.getRole() != Role.STUDENT) {
                return ResponseEntity.badRequest().body("Only students can give feedback");
            }

            Feedback feedback = feedbackMapper.toEntity(feedbackDTO);
            Feedback savedFeedback = feedbackService.createFeedback(student.getId(), feedback);
            return ResponseEntity.ok(feedbackMapper.toDTO(savedFeedback));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Admins can view all feedback
    @PreAuthorize("hasRole('ROLE_ADMIN') and hasAuthority('VIEW_FEEDBACK')")
    @GetMapping("/admin")
    public ResponseEntity<?> getAllFeedback(Authentication authentication) {
        try {
            String email = authentication.getName();
            User admin = userService.getUserByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (admin.getRole() != Role.ADMIN) {
                return ResponseEntity.badRequest().body("Only admins can view feedback");
            }

            List<FeedbackDTO> feedbackDTOs = feedbackService.getAllFeedback().stream()
                    .map(feedbackMapper::toDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(feedbackDTOs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Admins can view user feedback
    @PreAuthorize("hasRole('ROLE_ADMIN') and hasAuthority('VIEW_FEEDBACK')")
    @GetMapping("/admin/user/{userId}")
    public ResponseEntity<?> getFeedbackByUserId(
            @PathVariable Long userId,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            User admin = userService.getUserByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (admin.getRole() != Role.ADMIN) {
                return ResponseEntity.badRequest().body("Only admins can view user feedback");
            }

            List<FeedbackDTO> feedbackDTOs = feedbackService.getFeedbackByUserId(userId).stream()
                    .map(feedbackMapper::toDTO)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(feedbackDTOs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
