package com.example.springstart.service;

import com.example.springstart.entity.Meal;
import com.example.springstart.entity.MealCancellation;
import com.example.springstart.entity.Student;
import com.example.springstart.entity.User;
import com.example.springstart.enums.DayOfWeek;
import com.example.springstart.enums.MealType;
import com.example.springstart.repository.MealCancellationRepository;
import com.example.springstart.repository.MealRepository;
import com.example.springstart.repository.StudentRepository;
import com.example.springstart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealRepository mealRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final MealCancellationRepository mealCancellationRepository;

    @Transactional
    public Meal createMeal(Meal meal, String adminEmail) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found with email: " + adminEmail));

        meal.setAdmin(admin);

        if (!mealRepository.findByDayOfWeekAndMealType(meal.getDayOfWeek(), meal.getMealType()).isEmpty()) {
            throw new RuntimeException("Meal for " + meal.getDayOfWeek() + " and " + meal.getMealType() + " already exists!");
        }

        validateMeal(meal);
        return mealRepository.save(meal);
    }

    public List<Meal> getMealsByDayAndType(DayOfWeek dayOfWeek, MealType mealType) {
        return mealRepository.findByDayOfWeekAndMealType(dayOfWeek, mealType);
    }

    @Transactional
    public Meal updateMeal(Long id, Meal meal, String adminEmail) {
        Meal existingMeal = getMealById(id);
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found with email: " + adminEmail));

        existingMeal.setName(meal.getName());
        existingMeal.setDescription(meal.getDescription());
        existingMeal.setMealType(meal.getMealType());
        existingMeal.setDateTime(meal.getDateTime());
        existingMeal.setAdmin(admin);

        validateMeal(existingMeal);
        return mealRepository.save(existingMeal);
    }

    @Transactional
    public void deleteMeal(Long id) {
        if (!mealRepository.existsById(id)) {
            throw new RuntimeException("Meal not found with id: " + id);
        }
        mealRepository.deleteById(id);
    }

    public Meal getMealById(Long id) {
        return mealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Meal not found with id: " + id));
    }

    public List<Meal> getMealsByDay(DayOfWeek dayOfWeek) {
        return mealRepository.findByDayOfWeek(dayOfWeek);
    }

    public List<Meal> getMealsByType(String mealType) {
        return mealRepository.findByMealType(mealType);
    }

    private void validateMeal(Meal meal) {
        if (meal.getName() == null || meal.getName().trim().isEmpty()) {
            throw new RuntimeException("Meal name is required");
        }
        if (meal.getMealType() == null) {
            throw new RuntimeException("Meal type is required");
        }
    }

    // 🔹 New method for meal cancellation by student
    @Transactional
    public void cancelMeal(String studentEmail, LocalDate date) {
        // Find the student based on their email
        Student student = studentRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("Student not found with email: " + studentEmail));

        // Check if the meal exists for the given date and student
//        MealCancellation mealCancellation = mealCancellationRepository.findByDateAndStudentEmail(date, studentEmail)
//                .orElseThrow(() -> new RuntimeException("No meal found to cancel for this date."));
        MealCancellation mealCancellation = new MealCancellation();
        mealCancellation.setDate(date);
        mealCancellation.setStudent(student);
        mealCancellationRepository.save(mealCancellation);

        // Here, you can either delete the meal or mark it as canceled (depending on your logic)
        // For now, I'm just printing the information (you can replace it with actual logic)
//        System.out.println("Student " + student.getUsername() + " (" + studentEmail + ") canceled meal on " + date);

        // Optional: You can add a cancellation entry in the database or notify the admin
    }

}

