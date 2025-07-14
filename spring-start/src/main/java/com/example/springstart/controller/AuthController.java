package com.example.springstart.controller;

import com.example.springstart.dto.AuthRequest;
import com.example.springstart.dto.AuthResponse;
import com.example.springstart.dto.UserDTO;
import com.example.springstart.entity.User;
import com.example.springstart.enums.Role;
import com.example.springstart.repository.UserRepository;
import com.example.springstart.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    // Register any user
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    // User login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request, HttpServletRequest httpRequest, HttpServletResponse response) {
        try {
            AuthResponse authResponse = authService.login(request);

            if (authResponse.getRole() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("authenticated", false, "error", "Invalid credentials"));
            }

            // Create session if authentication is successful
            HttpSession session = httpRequest.getSession(true);

            // Store user authentication in SecurityContextHolder
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                authentication = new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        null,
                        authResponse.getRole().getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            // Store user details inside session
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
            session.setAttribute("user", request.getEmail());
            session.setAttribute("role", authResponse.getRole());

            // Set session cookie
            response.setHeader("Set-Cookie", "JSESSIONID=" + session.getId() + "; HttpOnly; Path=/; SameSite=Strict");

            return ResponseEntity.ok(Map.of(
                    "authenticated", true,
                    "role", authResponse.getRole()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("authenticated", false, "error", "Invalid credentials"));
        }
    }

    // Check if the user is authenticated
    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.ok(Map.of("authenticated", false));
        }

        String email = (String) session.getAttribute("user");
        Role roleEnum = (Role) session.getAttribute("role");
        String role = (roleEnum != null) ? roleEnum.name() : null;

        return ResponseEntity.ok(Map.of(
                "authenticated", true,
                "role", role
        ));
    }

    // Get the logged-in user's details
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getLoggedInUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Fetch user details from database
        Optional<User> optionalUser = userRepository.findByEmail(authentication.getName());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User user = optionalUser.get();
        UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getRole(), user.getProfilePicture());

        return ResponseEntity.ok(userDTO);
    }

    // Logout the user
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request, response);
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
