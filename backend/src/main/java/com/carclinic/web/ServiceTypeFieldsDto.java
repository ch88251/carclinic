package com.carclinic.web;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class ServiceTypeFieldsDto {

    @NotBlank
    private String name;

    private String description;

    @Min(1)
    private int estimatedTimeHours;

    public ServiceTypeFieldsDto() {
    }

    public ServiceTypeFieldsDto(String name, String description, int estimatedTimeHours) {
        this.name = name;
        this.description = description;
        this.estimatedTimeHours = estimatedTimeHours;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getEstimatedTimeHours() {
        return estimatedTimeHours;
    }

    public void setEstimatedTimeHours(int estimatedTimeHours) {
        this.estimatedTimeHours = estimatedTimeHours;
    }
}
