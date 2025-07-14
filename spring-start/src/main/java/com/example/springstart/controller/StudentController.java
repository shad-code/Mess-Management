package com.example.springstart.controller;

import com.example.springstart.dto.StudentDTO;
import com.example.springstart.entity.Student;
import com.example.springstart.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;



import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
@CrossOrigin
public class StudentController {

    private final StudentService studentService;

    // ✅ Get all students
    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // ✅ Get student profile using Authentication
    @GetMapping("/me")
    public StudentDTO getMyProfile(Authentication auth) {
        String email = auth.getName(); // Extract email from Authentication
        return studentService.getStudentByEmail(email);

    }

    // ✅ Update profile using Authentication
    @PutMapping("/me")
    public StudentDTO updateMyProfile(Authentication auth, @RequestBody StudentDTO dto) {
        String email = auth.getName(); // Extract email from Authentication
        return studentService.updateStudent(email, dto);
    }

    // ✅ Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Student>> getStudentById(Authentication auth, @PathVariable Long id) {
        String email = auth.getName();
        return ResponseEntity.ok(studentService.getStudentById(id));
    }



}

