package com.example.springstart.mapper;

import com.example.springstart.dto.ComplaintDTO;
import com.example.springstart.entity.Complaint;
import org.springframework.stereotype.Component;

@Component
public class ComplaintMapper {
    public ComplaintDTO toDTO(Complaint complaint) {
        if (complaint == null) {
            return null;
        }

        ComplaintDTO dto = new ComplaintDTO();
        dto.setId(complaint.getId());
        dto.setTitle(complaint.getTitle());
        dto.setDescription(complaint.getDescription());
        dto.setStatus(complaint.getStatus());
        dto.setStudentId(complaint.getStudent().getId());
        dto.setStudentName(complaint.getStudent().getUsername());
        if (complaint.getAdmin() != null) {
            dto.setAdminId(complaint.getAdmin().getId());
            dto.setAdminName(complaint.getAdmin().getUsername());
        }
        dto.setCourse(complaint.getCourse());
        dto.setCreatedAt(complaint.getCreatedAt());
        dto.setResolvedAt(complaint.getResolvedAt());
        dto.setResolution(complaint.getResolution());
        dto.setAdminResponse(complaint.getAdminResponse());

        return dto;
    }

    public Complaint toEntity(ComplaintDTO dto) {
        if (dto == null) return null;
        Complaint complaint = new Complaint();
        complaint.setId(dto.getId());
        complaint.setTitle(dto.getTitle());
        complaint.setDescription(dto.getDescription());
        complaint.setStatus(dto.getStatus());
        complaint.setCourse(dto.getCourse());
        complaint.setCreatedAt(dto.getCreatedAt());
        complaint.setResolvedAt(dto.getResolvedAt());
        complaint.setResolution(dto.getResolution());
        complaint.setAdminResponse(dto.getAdminResponse());
        return complaint;
    }
}