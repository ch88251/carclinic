package com.carclinic.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Table(name = "staff")
public class Staff extends Person {

  @Column(name = "role", nullable = false)
  private String role;

  public Staff() {
  }

  public Staff(String firstName, String lastName, String email, 
      String phoneNumber, String role) {
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
