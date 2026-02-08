package com.carclinic.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carclinic.domain.ServiceAppointment;
import com.carclinic.domain.ServiceAppointmentRepository;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final ServiceAppointmentRepository repository;

    public AppointmentController(ServiceAppointmentRepository repository) {
        this.repository = repository;
    }

    @GetMapping(produces = "application/json")
    public Iterable<ServiceAppointment> getAppointments() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<ServiceAppointment> addAppointment(@RequestBody ServiceAppointment appointment) {
        ServiceAppointment savedAppointment = repository.save(appointment);
        return ResponseEntity.ok(savedAppointment);
    }
}
