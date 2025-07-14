package com.example.springstart.service;

import com.example.springstart.entity.AttendanceDues;
import com.example.springstart.entity.MealCancellation;
import com.example.springstart.entity.Student;
import com.example.springstart.repository.AttendanceDuesRepository;
import com.example.springstart.repository.MealCancellationRepository;
import com.example.springstart.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class AttendanceDuesService {

    private static final int DAILY_CHARGE = 70;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MealCancellationRepository mealCancellationRepository;

    @Autowired
    private AttendanceDuesRepository attendanceDuesRepository;

    /**
     * ✅ For authenticated student: Get dues by email
     */
    public List<AttendanceDues> getStudentDuesByEmail(String email) {
        Student student = studentRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Student not found with email: " + email));

        return attendanceDuesRepository.findByStudentId(student.getId());
    }

    /**
     * ✅ Admin: Refresh dues for all students
     */
    public List<AttendanceDues> getAllDuesForAllStudents() {
        List<Student> allStudents = studentRepository.findAll();
        List<AttendanceDues> allDues = new ArrayList<>();

        for (Student student : allStudents) {
            allDues.addAll(calculateDuesForStudent(student.getEmail()));
        }

        return attendanceDuesRepository.saveAll(allDues);
    }

    /**
     * ✅ Admin: Recalculate dues for a specific student
     */
    public List<AttendanceDues> calculateDuesForStudent(String email) {
        Student student = studentRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Student not found with email: " + email));

        List<AttendanceDues> duesList = new ArrayList<>();
        YearMonth currentMonth = YearMonth.now();

        for (int month = 1; month <= currentMonth.getMonthValue(); month++) {
            String monthName = Month.of(month).name();
            int attendanceDays = getAttendanceDaysForMonth(student, monthName);
            int totalCharges = attendanceDays * DAILY_CHARGE;

            AttendanceDues dues = new AttendanceDues();
            dues.setStudent(student);
            dues.setMonth(monthName);
            dues.setAttendance(attendanceDays);
            dues.setCharges(totalCharges);
            dues.setPaid("No");

            duesList.add(dues);
        }

        return duesList;
    }

    private int getAttendanceDaysForMonth(Student student, String month) {
        int monthNumber = getMonthNumber(month);
        YearMonth yearMonth = YearMonth.now().withMonth(monthNumber);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        long totalDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;

        List<MealCancellation> cancellations =
                mealCancellationRepository.findByStudentAndDateBetween(student, startDate, endDate);

        return (int) (totalDays - cancellations.size());
    }

    private int getMonthNumber(String month) {
        try {
            return Month.valueOf(month.toUpperCase()).getValue();
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid month name: " + month);
        }
    }
}
