package com.example.springstart.repository;

import com.example.springstart.entity.Meal;
import com.example.springstart.entity.MealCancellation;
import com.example.springstart.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MealCancellationRepository extends JpaRepository<MealCancellation, Long> {

    // ✅ Fetch only dates of canceled meals for a specific student
    @Query("SELECT m.date FROM MealCancellation m WHERE m.student.id = :studentId")
    List<LocalDate> findCancelledDatesByStudentId(@Param("studentId") Long studentId);

    List<MealCancellation> findByStudentAndDateBetween(Student student, LocalDate startDate, LocalDate endDate);
//    Optional<MealCancellation> findByDateAndStudentEmail(LocalDate date, String studentEmail);

}
