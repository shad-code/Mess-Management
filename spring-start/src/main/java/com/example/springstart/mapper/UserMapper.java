package com.example.springstart.mapper;

import com.example.springstart.dto.UserDTO;
import com.example.springstart.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDTO toDTO(User user) {
        if (user == null) return null;
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole());
        dto.setCourse(user.getCourse());
        dto.setRoomNumber(user.getRoomNumber());
        dto.setPhoneNumber(user.getPhone());
        return dto;
    }

    public User toEntity(UserDTO dto) {
        if (dto == null) return null;
        User user = new User();
        user.setId(dto.getId());
        user.setUsername(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRole(dto.getRole());
        user.setCourse(dto.getCourse());
        user.setRoomNumber(dto.getRoomNumber());
        user.setPhone(dto.getPhoneNumber());
        return user;
    }
} 