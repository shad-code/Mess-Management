package com.example.springstart.repository;

import com.example.springstart.entity.User;
import com.example.springstart.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByCourse(String course);
    List<User> findByCourseContainingIgnoreCase(String course);

    List<User> findByRole(Role role);
} 