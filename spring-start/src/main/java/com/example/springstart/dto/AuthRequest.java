package com.example.springstart.dto;

import com.example.springstart.enums.Role;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    private String email;
    private String password;
    private String role; // Role as string, to convert to Role enum
    private String name;
    private String studentId;
    private String course;
    private String year;
    private String hostel;
    private String phone;
    private String address;
    private String payment;
    private String status;
}
