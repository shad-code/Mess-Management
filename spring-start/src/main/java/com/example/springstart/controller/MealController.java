package com.example.springstart.controller;

import com.example.springstart.dto.MealDTO;
import com.example.springstart.entity.Meal;
import com.example.springstart.enums.DayOfWeek;
import com.example.springstart.mapper.MealMapper;
import com.example.springstart.service.MealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/meals")
@RequiredArgsConstructor
public class MealController {

    private final MealService mealService;
    private final MealMapper mealMapper;

    // 🔹 Create Meal (Only Admins)
    @PreAuthorize("hasAuthority('MANAGE_MEALS')")
    @PostMapping
    public ResponseEntity<MealDTO> createMeal(Authentication authentication, @RequestBody MealDTO mealDTO) {
        String adminEmail = getAuthenticatedUserEmail(authentication);
        Meal meal = mealMapper.toEntity(mealDTO);
        Meal savedMeal = mealService.createMeal(meal, adminEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(mealMapper.toDTO(savedMeal));
    }

    // 🔹 Get All Meals (For Students & Admins)
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    @GetMapping("/student/filter")
    public ResponseEntity<List<MealDTO>> getMealsByDay(Authentication authentication, @RequestParam("dayOfWeek") DayOfWeek dayOfWeek) {
        String adminEmail = getAuthenticatedUserEmail(authentication);  // Assuming you use this for some logic, otherwise it's not needed in this method.

        // Get meals for the specified day
        List<Meal> meals = mealService.getMealsByDay(dayOfWeek);

        // Convert to DTOs
        List<MealDTO> mealDTOs = meals.stream().map(mealMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok(mealDTOs);  // Return as response
    }


    // 🔹 Update Meal (Only Admins)
    @PreAuthorize("hasAuthority('MANAGE_MEALS')")
    @PutMapping("/{mealId}")
    public ResponseEntity<MealDTO> updateMeal(Authentication authentication, @PathVariable Long mealId, @RequestBody MealDTO mealDTO) {
        String adminEmail = getAuthenticatedUserEmail(authentication);
        Meal meal = mealMapper.toEntity(mealDTO);
        Meal updatedMeal = mealService.updateMeal(mealId, meal, adminEmail);
        return ResponseEntity.ok(mealMapper.toDTO(updatedMeal));
    }

    // 🔹 Delete Meal (Only Admins)
    @PreAuthorize("hasAuthority('MANAGE_MEALS')")
    @DeleteMapping("/{mealId}")
    public ResponseEntity<String> deleteMeal(Authentication authentication, @PathVariable Long mealId) {
        String adminEmail = getAuthenticatedUserEmail(authentication);
        mealService.deleteMeal(mealId);
        return ResponseEntity.ok("Meal deleted successfully by: " + adminEmail);
    }
     //🔹 Cancel Meal (For Students)
//    @PreAuthorize("hasAuthority('CANCEL_MEAL')")
    @GetMapping("/cancel")
    public ResponseEntity<String> cancelMeal(Authentication authentication, @RequestParam("date") String dateStr) {
        String studentEmail = getAuthenticatedUserEmail(authentication);
        LocalDate localDate = LocalDate.parse(dateStr);
        System.out.println("date" + localDate);
        // You can add a service call here to store cancellation info or notify admin
        mealService.cancelMeal(studentEmail, localDate);

        // Optional: store this in DB or send to admin dashboard

        return ResponseEntity.ok("Meal cancellation submitted successfully.");
    }


    // 🔹 Helper Method to Get Authenticated User Email
    private String getAuthenticatedUserEmail(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not authenticated.");
        }

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            return userDetails.getUsername();
        } else if (authentication.getPrincipal() instanceof String email) {
            return email;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid authentication principal.");
        }
    }

    // 🔹 Global Exception Handler for Internal Server Errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
    }
}



