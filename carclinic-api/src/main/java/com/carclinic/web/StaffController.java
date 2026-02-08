package com.carclinic.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carclinic.domain.Staff;
import com.carclinic.domain.StaffRepository;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/staff")
public class StaffController {

    private final StaffRepository repository;

    public StaffController(StaffRepository repository) {
        this.repository = repository;
    }

    @GetMapping(produces = "application/json")
    public Iterable<Staff> getStaff() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Staff> addStaff(@RequestBody Staff staff) {
        Staff savedStaff = repository.save(staff);
        return ResponseEntity.ok(savedStaff);
    }
}
