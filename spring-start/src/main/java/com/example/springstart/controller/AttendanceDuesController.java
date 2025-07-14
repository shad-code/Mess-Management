package com.example.springstart.controller;

import com.example.springstart.entity.AttendanceDues;
import com.example.springstart.service.AttendanceDuesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance-dues")
@RequiredArgsConstructor
public class AttendanceDuesController {

    private final AttendanceDuesService attendanceDuesService;

    /**
     * ✅ Student: Get their own attendance dues
     */
    @GetMapping("/my-dues")
    public ResponseEntity<?> getMyDues(Authentication authentication) {
        try {
            String email = authentication.getName();
            List<AttendanceDues> dues = attendanceDuesService.getStudentDuesByEmail(email);
            return ResponseEntity.ok(dues);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching dues.");
        }
    }

    /**
     * ✅ Admin: Refresh dues for all students
     */
    @PreAuthorize("hasAuthority('MANAGE_ATTENDANCE_DUES')")
    @GetMapping("/all")
    public ResponseEntity<?> getAllDues() {
        try {
            List<AttendanceDues> allDues = attendanceDuesService.getAllDuesForAllStudents();
            return ResponseEntity.ok(allDues);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching all dues.");
        }
    }
}
