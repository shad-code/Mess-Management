package com.example.springstart.repository;

import com.example.springstart.entity.Meal;
import com.example.springstart.entity.Student;
import com.example.springstart.enums.DayOfWeek;
import com.example.springstart.enums.MealType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    List<Meal> findByMealType(String mealType);

    List<Meal> findByDayOfWeekAndMealType(DayOfWeek dayOfWeek, MealType mealType);

    List<Meal> findByDayOfWeek(DayOfWeek dayOfWeek);

   // boolean existsByStudentAndDate(Student student, LocalDate date);


    // Optional<Meal> findByDateAndStudentEmail(LocalDate date, String studentEmail); // ✅ Fixed: using 'name' instead of 'studentEmail'
}

