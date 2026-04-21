package com.carclinic.web;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.carclinic.domain.ServiceAppointment;
import com.carclinic.domain.ServiceAppointmentRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
@Validated
public class AppointmentController {

    private final ServiceAppointmentRepository repository;
    private final ServiceAppointmentMapper serviceAppointmentMapper;

    public AppointmentController(ServiceAppointmentRepository repository,
            ServiceAppointmentMapper serviceAppointmentMapper) {
        this.repository = repository;
        this.serviceAppointmentMapper = serviceAppointmentMapper;
    }

    @GetMapping(produces = "application/json")
    public List<ServiceAppointmentDto> getAppointments() {
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .map(serviceAppointmentMapper::toServiceAppointmentDto)
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<ServiceAppointmentDto> addAppointment(@Valid @RequestBody ServiceAppointmentFieldsDto request) {
        ServiceAppointment appointment = serviceAppointmentMapper.toServiceAppointment(request);
        repository.save(appointment);

        ServiceAppointmentDto response = serviceAppointmentMapper.toServiceAppointmentDto(appointment);
        URI location = UriComponentsBuilder.fromPath("/api/appointments/{id}")
                .buildAndExpand(appointment.getId())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }
}
