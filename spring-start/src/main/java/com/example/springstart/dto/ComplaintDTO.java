package com.example.springstart.dto;

import com.example.springstart.entity.ComplaintStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ComplaintDTO {
    private Long id;
    private String title;
    private String description;
    private ComplaintStatus status;
    private Long studentId;
    private String studentName;
    private Long adminId;
    private String adminName;
    private String course;
    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
    private String resolution;
    private String adminResponse;
} 