package com.example.springstart.mapper;

import com.example.springstart.dto.FeedbackDTO;
import com.example.springstart.entity.Feedback;
import org.springframework.stereotype.Component;

@Component
public class FeedbackMapper {
    public FeedbackDTO toDTO(Feedback feedback) {
        if (feedback == null) {
            return null;
        }
        
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(feedback.getId());
        dto.setUserId(feedback.getUser().getId());
        dto.setUserName(feedback.getUser().getUsername());
        dto.setRating(feedback.getRating());
        dto.setFeedbackText(feedback.getFeedbackText());
        dto.setCreatedAt(feedback.getCreatedAt());
        return dto;
    }

    public Feedback toEntity(FeedbackDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Feedback feedback = new Feedback();
        feedback.setId(dto.getId());
        feedback.setRating(dto.getRating());
        feedback.setFeedbackText(dto.getFeedbackText());
        feedback.setCreatedAt(dto.getCreatedAt());
        return feedback;
    }
} 