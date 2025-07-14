package com.example.springstart.service;

import com.example.springstart.dto.AuthRequest;
import com.example.springstart.dto.AuthResponse;
import com.example.springstart.entity.Student;
import com.example.springstart.entity.User;
import com.example.springstart.enums.Role;
import com.example.springstart.repository.StudentRepository;
import com.example.springstart.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StudentRepository studentRepository;

    // Register a new user
    public AuthResponse register(AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse("Email already exists", null);
        }

        if (request.getRole() == null) {
            return new AuthResponse("Role is required", null);
        }

        Role role;
        try {
            role = Role.valueOf(String.valueOf(request.getRole()));
        } catch (IllegalArgumentException e) {
            return new AuthResponse("Invalid role: " + request.getRole(), null);
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        User saved = userRepository.save(user);

        // If the role is Student, create and save the Student entity
        if (role == Role.STUDENT) {
            Student student = new Student();
            student.setEmail(request.getEmail());
            student.setName(request.getName());
            student.setStudentId(request.getStudentId());
            student.setCourse(request.getCourse());
            student.setYear(request.getYear());
            student.setHostel(request.getHostel());
            student.setPhone(request.getPhone());
            student.setAddress(request.getAddress());
            student.setPayment(request.getPayment());
            student.setStatus(request.getStatus());

            // Save the student to the Student table
            studentRepository.save(student);
        }
        return new AuthResponse("User registered successfully", saved.getRole());
    }

    // User login
    public AuthResponse login(AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            UsernamePasswordAuthenticationToken authWithRoles = new UsernamePasswordAuthenticationToken(
                    user.getEmail(),
                    user.getPassword(),
                    user.getAuthorities()
            );

            SecurityContextHolder.getContext().setAuthentication(authWithRoles);

            return new AuthResponse("Login successful as " + user.getRole().name(), user.getRole());
        } catch (Exception e) {
            return new AuthResponse("Invalid credentials", null);
        }
    }

    // Logout
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextHolder.clearContext();

        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        response.setHeader("Set-Cookie", "JSESSIONID=; HttpOnly; Path=/; Max-Age=0");
    }
}
