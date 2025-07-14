package com.example.springstart.repository;

import com.example.springstart.entity.AttendanceDues;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceDuesRepository extends JpaRepository<AttendanceDues,Long> {
    List<AttendanceDues> findByStudentId(Long Id);
}
