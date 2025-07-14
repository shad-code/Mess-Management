package com.example.springstart.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "complaints")
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintStatus status = ComplaintStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false) // ✅ Ensure Student is Set
    private User student;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;

    @Column(nullable = false)
    private String course;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime resolvedAt;

    @Column(length = 1000)
    private String resolution;

    @Column(length = 1000)
    private String adminResponse; // ✅ Ensured Proper Column Definition

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
