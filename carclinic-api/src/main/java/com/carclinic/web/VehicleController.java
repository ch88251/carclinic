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
import com.carclinic.domain.Vehicle;
import com.carclinic.domain.VehicleRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/vehicles")
@Validated
public class VehicleController {
	
	private final VehicleRepository repository;
	private final VehicleMapper vehicleMapper;

	public VehicleController(VehicleRepository repository, VehicleMapper vehicleMapper) {
		this.repository = repository;
		this.vehicleMapper = vehicleMapper;
	}

	@GetMapping(produces = "application/json")
	public List<VehicleDto> getVehicles() {
		return StreamSupport.stream(repository.findAll().spliterator(), false)
				.map(vehicleMapper::toVehicleDto)
				.collect(Collectors.toList());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping(consumes = "application/json", produces = "application/json")
	public ResponseEntity<VehicleDto> addVehicle(@Valid @RequestBody VehicleFieldsDto request) {
		Vehicle vehicle = vehicleMapper.toVehicle(request);
		repository.save(vehicle);

		VehicleDto response = vehicleMapper.toVehicleDto(vehicle);
		URI location = UriComponentsBuilder.fromPath("/api/vehicles/{id}")
				.buildAndExpand(vehicle.getId())
				.toUri();

		return ResponseEntity.created(location).body(response);
	}
	
}