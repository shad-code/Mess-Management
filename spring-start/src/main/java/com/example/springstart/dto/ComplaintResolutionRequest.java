package com.example.springstart.dto;

import lombok.Data;

@Data
public class ComplaintResolutionRequest {
    private Long adminId;
    private String resolution;
}
