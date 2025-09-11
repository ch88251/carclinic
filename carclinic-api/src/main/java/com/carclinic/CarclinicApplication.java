package com.carclinic;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.carclinic.domain.VehicleRepository;
import com.carclinic.domain.OwnerRepository;
import com.carclinic.domain.Vehicle;
import com.carclinic.domain.Owner;

@SpringBootApplication
public class CarclinicApplication implements CommandLineRunner {

	private final VehicleRepository vehicleRepository;
	private final OwnerRepository ownerRepository;

	public CarclinicApplication(VehicleRepository vehicleRepository, OwnerRepository ownerRepository) {
		this.vehicleRepository = vehicleRepository;
		this.ownerRepository = ownerRepository;
	}

  public static void main(String[] args) {
    SpringApplication.run(CarclinicApplication.class, args);

  }

  public void run(String... args) throws Exception {
    // Add owner objects and save these to db
    ownerRepository.saveAll(List.of(
        new Owner("John", "Doe", "john.doe@example.com", "303-555-1234"),
        new Owner("Jane", "Smith", "jane.smith@example.com", "303-555-2345"),
        new Owner("Emily", "Johnson", "emily.johnson@example.com", "303-555-3456"),
        new Owner("Michael", "Williams", "michael.williams@example.com", "303-555-4567"),
        new Owner("Sarah", "Brown", "sarah.brown@example.com", "303-555-5678")
    ));

    // Add vehicle objects and save these to db
    vehicleRepository.saveAll(List.of(
        new Vehicle("1HGBH41JXMN109186", "Toyota", "Camry", "Blue", 2020, 15000, LocalDate.of(2023, 6, 15).toString(), LocalDate.of(2024, 6, 15).toString(), ownerRepository.findById(1L).orElse(null)),
        new Vehicle("2FAGP9CW0HH123456", "Honda", "Civic", "Red", 2019, 20000, LocalDate.of(2023, 5, 20).toString(), LocalDate.of(2024, 5, 20).toString(), ownerRepository.findById(2L).orElse(null)),
        new Vehicle("3FA6P0H72HR987654", "Ford", "Focus", "White", 2018, 25000, LocalDate.of(2023, 4, 10).toString(), LocalDate.of(2024, 4, 10).toString(), ownerRepository.findById(3L).orElse(null)),
        new Vehicle("1C4RJFBG0FC123789", "Chevrolet", "Malibu", "Black", 2021, 10000, LocalDate.of(2023, 7, 5).toString(), LocalDate.of(2024, 7, 5).toString(), ownerRepository.findById(4L).orElse(null)),
        new Vehicle("5NPE24AF8FH456321", "Nissan", "Altima", "Gray", 2017, 30000, LocalDate.of(2023, 3, 15).toString(), LocalDate.of(2024, 3, 15).toString(), ownerRepository.findById(5L).orElse(null))
    ));
  }
}
