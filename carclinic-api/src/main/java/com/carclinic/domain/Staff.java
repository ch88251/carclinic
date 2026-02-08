package com.carclinic.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "staff")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Staff extends Person {

    @Column(name = "role", nullable = false)
    private String role;

    public Staff() {
    }

    public Staff(String firstName, String lastName, String email, String phoneNumber, String role) {
        super(firstName, lastName, email, phoneNumber);
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
