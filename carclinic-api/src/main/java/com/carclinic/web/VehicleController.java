package com.carclinic.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.carclinic.domain.Vehicle;
import com.carclinic.domain.VehicleRepository;

@RestController
public class VehicleController {
	
	private final VehicleRepository repository;

	public VehicleController(VehicleRepository repository) {
		this.repository = repository;
	}

	@GetMapping(path = "/vehicles", produces = "application/json")
	public Iterable<Vehicle> getVehicles() {
		return repository.findAll();
	}

	@DeleteMapping(path = "/vehicles/{id}")
	public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
}