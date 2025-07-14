package com.example.springstart.enums;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.springstart.enums.Permission.*;

@Getter
@RequiredArgsConstructor
public enum Role {
    STUDENT(Set.of(
            VIEW_MEALS,
            GIVE_FEEDBACK,
            VIEW_ATTENDANCE_DUES,
            CANCEL_MEAL// ✅ Students can view their dues
    )),

    ADMIN(Set.of(
            MANAGE_MEALS,
            VIEW_MEALS,
            MANAGE_USERS,
            VIEW_FEEDBACK,
            MANAGE_ATTENDANCE_DUES, // ✅ Admins can manage dues
            VIEW_ATTENDANCE_DUES    // Optional: allow admins to view
    ));

    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = permissions.stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());

        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }

    @JsonValue
    public String toJson() {
        return name();
    }
}
