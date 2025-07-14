package com.example.springstart.controller;

import com.example.springstart.dto.ComplaintDTO;
import com.example.springstart.dto.ComplaintResolutionRequest;
import com.example.springstart.entity.Complaint;
import com.example.springstart.mapper.ComplaintMapper;
import com.example.springstart.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private ComplaintMapper complaintMapper;

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/create")
    public ResponseEntity<?> createComplaint(Authentication authentication,
                                             @RequestBody ComplaintDTO complaintDTO) {
        try {
            String email = authentication.getName(); // Get email from authenticated user
            Complaint complaint = complaintService.createComplaint(
                    email,
                    complaintDTO.getTitle(),
                    complaintDTO.getDescription(),
                    complaintDTO.getCourse()
            );
            return ResponseEntity.ok(complaintMapper.toDTO(complaint));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{complaintId}/resolve")
    public ResponseEntity<?> resolveComplaint(
            @PathVariable Long complaintId,
            @RequestBody ComplaintResolutionRequest request,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            Complaint complaint = complaintService.resolveComplaint(complaintId, email, request.getResolution());
            return ResponseEntity.ok(complaintMapper.toDTO(complaint));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{complaintId}/reject")
    public ResponseEntity<?> rejectComplaint(
            @PathVariable Long complaintId,
            @RequestBody ComplaintResolutionRequest request,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            Complaint complaint = complaintService.rejectComplaint(complaintId, email, request.getResolution());
            return ResponseEntity.ok(complaintMapper.toDTO(complaint));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/my")
    public ResponseEntity<?> getStudentComplaints(Authentication authentication) {
        try {
            String email = authentication.getName();
            List<Complaint> complaints = complaintService.getStudentComplaintsByEmail(email);
            List<ComplaintDTO> dtos = complaints.stream().map(complaintMapper::toDTO).collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/my/resolved")
    public ResponseEntity<?> getStudentResolvedComplaints(Authentication authentication) {
        try {
            String email = authentication.getName();
            List<Complaint> complaints = complaintService.getStudentResolvedComplaintsByEmail(email);
            List<ComplaintDTO> dtos = complaints.stream().map(complaintMapper::toDTO).collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/all")
    public ResponseEntity<?> getAdminComplaints(Authentication authentication) {
        try {
            String email = authentication.getName();
            List<Complaint> complaints = complaintService.getAdminComplaintsByEmail(email);
            List<ComplaintDTO> dtos = complaints.stream()
                    .map(complaintMapper::toDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getComplaintById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(complaintMapper.toDTO(complaintService.getComplaintById(id)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
