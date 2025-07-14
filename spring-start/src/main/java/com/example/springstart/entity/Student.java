package com.example.springstart.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String studentId;
    private String course;
    private String year;
    private String hostel;
    private String phone;
    private String address;
    private String payment;
    private String status;
}

