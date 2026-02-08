package com.carclinic.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carclinic.domain.ServiceType;
import com.carclinic.domain.ServiceTypeRepository;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/service-types")
public class ServiceTypeController {

    private final ServiceTypeRepository repository;

    public ServiceTypeController(ServiceTypeRepository repository) {
        this.repository = repository;
    }

    @GetMapping(produces = "application/json")
    public Iterable<ServiceType> getServiceTypes() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceType(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<ServiceType> addServiceType(@RequestBody ServiceType serviceType) {
        ServiceType savedServiceType = repository.save(serviceType);
        return ResponseEntity.ok(savedServiceType);
    }
}
