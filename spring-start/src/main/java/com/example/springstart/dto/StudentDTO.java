package com.example.springstart.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {
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
