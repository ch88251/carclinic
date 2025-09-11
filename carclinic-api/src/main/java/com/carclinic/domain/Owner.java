package com.carclinic.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "owners")
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Owner {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long ownerid;

  @Column(name="first_name", nullable = false)
	private String firstName;

  @Column(name="last_name", nullable = false)
  private String lastName;

  @Column(name="email", nullable = false)
  private String email;

  @Column(name="phone", nullable = false)
  private String phone;

	public Owner() {
	}

  public Owner(String firstName, String lastName, String email, String phone) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  public Long getOwnerid() {
    return ownerid;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "owner")
  private List<Vehicle> vehicles;

}