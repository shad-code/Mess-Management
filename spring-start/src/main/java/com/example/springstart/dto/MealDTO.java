package com.example.springstart.dto;

import com.example.springstart.enums.DayOfWeek;
import com.example.springstart.enums.MealType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MealDTO {
    // Getters and Setters

    private Long id;
    private String name;
    private String description;
    private MealType mealType;
    private DayOfWeek dayOfWeek;
    private String dateTime;
    private String time;  // e.g., "8:00 AM - 10:00 AM"

    private Long adminId;

    private LocalDate date;

}