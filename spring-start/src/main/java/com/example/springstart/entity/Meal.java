package com.example.springstart.entity;

import com.example.springstart.enums.DayOfWeek;
import com.example.springstart.enums.MealType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "meals")
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    private String time;
    
    private String description;

    @Column(name = "meal_type")
    @Enumerated(EnumType.STRING)
    private MealType mealType;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    @Column(name = "date_time")
    private LocalDateTime dateTime=LocalDateTime.now();

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin; // Reference to the User who created/updated the meal

}
