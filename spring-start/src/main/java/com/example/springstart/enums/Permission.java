package com.example.springstart.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permission {
    MANAGE_STUDENTS("MANAGE_STUDENT"),
    MANAGE_MEALS("MANAGE_MEALS"),
    VIEW_MEALS("VIEW_MEALS"),
    MANAGE_USERS("MANAGE_USERS"),
    VIEW_FEEDBACK("VIEW_FEEDBACK"),
    GIVE_FEEDBACK("GIVE_FEEDBACK"),
    CANCEL_MEAL("CANCEL_MEAL"),
    // ✅ New Permissions
    VIEW_ATTENDANCE_DUES("VIEW_ATTENDANCE_DUES"),
    MANAGE_ATTENDANCE_DUES("MANAGE_ATTENDANCE_DUES");

    private final String permission;
}
