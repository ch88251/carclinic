package com.carclinic.web;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.ResponseEntity;

import com.carclinic.domain.Staff;
import com.carclinic.domain.StaffRepository;


@RestController
@RequestMapping("/staff")
public class StaffController {

  private final StaffRepository repository;

  public StaffController(StaffRepository repository) {
    this.repository = repository;
  }

  public ResponseEntity<Staff> addStaff(@RequestBody Staff staff) {
    Staff savedStaff = repository.save(staff);
    return ResponseEntity.ok(savedStaff);
  }

  @GetMapping(produces = "application/json")
  public Iterable<Staff> getStaff() {
    return repository.findAll();
  }

  @PostMapping(consumes = "application/json", produces = "application/json")
  public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
    repository.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
