package com.example.springstart.service;

import com.example.springstart.dto.UserDTO;
import com.example.springstart.entity.Complaint;
import com.example.springstart.entity.ComplaintStatus;
import com.example.springstart.entity.User;
import com.example.springstart.enums.Role;
import com.example.springstart.repository.ComplaintRepository;
import com.example.springstart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {
    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public Complaint createComplaint(String email, String title, String description, String course) {
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (student.getRole() != Role.STUDENT) {
            throw new RuntimeException("Only students can create complaints");
        }

        Complaint complaint = new Complaint();
        complaint.setTitle(title);
        complaint.setDescription(description);
        complaint.setCourse(course);
        complaint.setStudent(student);
        complaint.setStatus(ComplaintStatus.PENDING);
        complaint.setCreatedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }

    public Complaint resolveComplaint(Long complaintId, String adminEmail, String resolution) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only admins can resolve complaints");
        }

        complaint.setStatus(ComplaintStatus.RESOLVED);
        complaint.setAdmin(admin);
        complaint.setAdminResponse(resolution);
        complaint.setResolvedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }

    public Complaint rejectComplaint(Long complaintId, String adminEmail, String resolution) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only admins can reject complaints");
        }

        complaint.setStatus(ComplaintStatus.REJECTED);
        complaint.setAdmin(admin);
        complaint.setAdminResponse(resolution);
        complaint.setResolvedAt(LocalDateTime.now());

        return complaintRepository.save(complaint);
    }

    public List<Complaint> getStudentComplaintsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return complaintRepository.findByStudentId(user.getId());
    }

    public List<Complaint> getStudentResolvedComplaintsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return complaintRepository.findByStudentIdAndStatus(user.getId(), ComplaintStatus.RESOLVED);
    }

    public List<Complaint> getAdminComplaintsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch only complaints that are assigned to the admin (i.e., complaints with a non-null admin_id)
        return complaintRepository.findAll();
    }


    public Complaint getComplaintById(Long id) {
        return complaintRepository.getReferenceById(id);
    }
}