package com.example.springstart.service;

import com.example.springstart.dto.UserDTO;
import com.example.springstart.entity.User;
import com.example.springstart.enums.Role;
import com.example.springstart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(UserDTO userDTO) {
        if (userDTO == null) {
            throw new RuntimeException("User data cannot be null");
        }
        if (userDTO.getName() == null || userDTO.getName().trim().isEmpty()) {
            throw new RuntimeException("Name is required");
        }
        if (userDTO.getEmail() == null || userDTO.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        if (userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }
        if (userDTO.getRole() == null) {
            throw new RuntimeException("Role is required");
        }

        // Check if email already exists
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Validate role-specific requirements
        if (userDTO.getRole() == Role.STUDENT) {
            if (userDTO.getCourse() == null || userDTO.getCourse().trim().isEmpty()) {
                throw new RuntimeException("Course is required for students");
            }
        }

        // Convert DTO to Entity
        User user = new User();
        user.setUsername(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());
        user.setRoomNumber(userDTO.getRoomNumber());
        user.setPhone(userDTO.getPhoneNumber());

        if (userDTO.getRole() == Role.STUDENT) {
            user.setCourse(userDTO.getCourse());
        }

        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public User updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        if (userDTO.getName() != null && !userDTO.getName().trim().isEmpty()) {
            existingUser.setUsername(userDTO.getName());
        }

        if (userDTO.getEmail() != null && !userDTO.getEmail().trim().isEmpty()) {
            Optional<User> existingUserWithEmail = userRepository.findByEmail(userDTO.getEmail());
            if (existingUserWithEmail.isPresent() && !existingUserWithEmail.get().getId().equals(id)) {
                throw new RuntimeException("Email already exists");
            }
            existingUser.setEmail(userDTO.getEmail());
        }

        if (userDTO.getPassword() != null && !userDTO.getPassword().trim().isEmpty()) {
            existingUser.setPassword(userDTO.getPassword());
        }

        if (userDTO.getRole() != null) {
            existingUser.setRole(userDTO.getRole());
        }

        if (userDTO.getRole() == Role.STUDENT && userDTO.getCourse() != null) {
            existingUser.setCourse(userDTO.getCourse());
        }

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }

    public List<UserDTO> getUsersByRole(Role role) {
        return userRepository.findByRole(role).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<UserDTO> getUsersByCourse(String course) {
        return userRepository.findByCourse(course).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<User> searchUsersByCourse(String course) {
        return userRepository.findByCourseContainingIgnoreCase(course);
    }

    public Long getStudentIdByEmail(String email) {
        Optional<User> student = userRepository.findByEmail(email);
        if (student.isPresent() && student.get().getRole() == Role.STUDENT) {
            return student.get().getId();
        }
        throw new RuntimeException("Student not found or not a valid student!");
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole());
        dto.setRoomNumber(user.getRoomNumber());
        dto.setPhoneNumber(user.getPhone());
        dto.setCourse(user.getCourse());
        return dto;
    }
}
