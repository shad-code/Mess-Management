package com.example.springstart.service;

import com.example.springstart.dto.StudentDTO;
import com.example.springstart.entity.Student;
import com.example.springstart.entity.User;
import com.example.springstart.repository.StudentRepository;
import com.example.springstart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository; // ✅ Inject UserRepository

    // ✅ Fetch student by email (from Authentication)
    public StudentDTO getStudentByEmail(String email) {
        // Search for the user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        // Find the corresponding student by user ID or student ID
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with email: " + email));

        return mapToDTO(student);
    }

    // ✅ Update student data from the DTO
    public StudentDTO updateStudent(String email, StudentDTO dto) {
        // Find the user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        // Find the corresponding student by user ID or student ID
        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with email: " + email));

        // Update fields from the DTO
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setStudentId(dto.getStudentId());
        student.setCourse(dto.getCourse());
        student.setYear(dto.getYear());
        student.setHostel(dto.getHostel());
        student.setPhone(dto.getPhone());
        student.setAddress(dto.getAddress());
        student.setPayment(dto.getPayment());
        student.setStatus(dto.getStatus());

        // Save and return updated DTO
        Student updated = studentRepository.save(student);
        return mapToDTO(updated);
    }

    // ✅ Convert Entity to DTO
    private StudentDTO mapToDTO(Student student) {
        return StudentDTO.builder()
                .name(student.getName())
                .email(student.getEmail())
                .studentId(student.getStudentId())
                .course(student.getCourse())
                .year(student.getYear())
                .hostel(student.getHostel())
                .phone(student.getPhone())
                .address(student.getAddress())
                .payment(student.getPayment())
                .status(student.getStatus())
                .build();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
