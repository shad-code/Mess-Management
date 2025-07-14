package com.example.springstart.dto;

import com.example.springstart.enums.Role;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String profilePicture;
    private Role role;
    private String roomNumber;
    private String phoneNumber;
    private String course;
    private String studentId;

    public UserDTO(Long id, String username, String email, Role role, String profilePicture) {
        this.id = id;
        this.name = username;
        this.email = email;
        this.role = role;
        this.profilePicture = profilePicture;
    }
}
