package com.example.springstart.repository;

import com.example.springstart.entity.Complaint;
import com.example.springstart.entity.ComplaintStatus;
import com.example.springstart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStudent(User student);
    List<Complaint> findByAdmin(User admin);
    List<Complaint> findByStatus(ComplaintStatus status);
    List<Complaint> findByStudentAndStatus(User student, ComplaintStatus status);
    List<Complaint> findByStudentId(Long studentId);
    List<Complaint> findByStudentIdAndStatus(Long studentId, ComplaintStatus status);
    List<Complaint> findByAdminId(Long adminId);

    public List<Complaint> findByAdminIdAndStatusNot(Long adminId, ComplaintStatus status);

}