package com.example.springstart.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Integer rating;
    private String feedbackText;
    private LocalDateTime createdAt;
}
