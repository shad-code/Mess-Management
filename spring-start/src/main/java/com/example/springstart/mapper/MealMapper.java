package com.example.springstart.mapper;

import com.example.springstart.dto.MealDTO;
import com.example.springstart.entity.Meal;
import org.springframework.stereotype.Component;

@Component
public class MealMapper {
    public MealDTO toDTO(Meal meal) {
        if (meal == null) {
            return null;
        }

        MealDTO dto = new MealDTO();
        dto.setId(meal.getId());
        dto.setName(meal.getName());
        dto.setDescription(meal.getDescription());
        dto.setMealType(meal.getMealType());
        dto.setDayOfWeek(meal.getDayOfWeek());
        dto.setTime(meal.getTime());
        dto.setAdminId(meal.getAdmin() != null ? meal.getAdmin().getId() : null); // ✅ Set Admin ID

        return dto;
    }

    public Meal toEntity(MealDTO dto) {
        if (dto == null) {
            return null;
        }

        Meal meal = new Meal();
        meal.setName(dto.getName());
        meal.setDescription(dto.getDescription());
        meal.setMealType(dto.getMealType());
        meal.setDayOfWeek(dto.getDayOfWeek()); // ✅ Added

        return meal;
    }
}
