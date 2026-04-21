package com.carclinic.web;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.carclinic.domain.Vehicle;
import com.carclinic.domain.VehicleRepository;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
	
	private final VehicleRepository repository;

	public VehicleController(VehicleRepository repository) {
		this.repository = repository;
	}

	@GetMapping(produces = "application/json")
	public Iterable<Vehicle> getVehicles() {
		return repository.findAll();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping(consumes = "application/json", produces = "application/json")
	public ResponseEntity<Vehicle> addVehicle(@RequestBody @NonNull Vehicle vehicle) {
		Vehicle savedVehicle = repository.save(vehicle);
		return ResponseEntity.created(null).body(savedVehicle);
	}
	
}