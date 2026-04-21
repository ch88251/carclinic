package com.carclinic.web;

import com.carclinic.domain.Vehicle;
import com.carclinic.domain.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class VehicleControllerTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleController vehicleController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getVehicles_returnsAllVehicles() {
        Vehicle v1 = new Vehicle();
        Vehicle v2 = new Vehicle();
        List<Vehicle> vehicles = Arrays.asList(v1, v2);
        when(vehicleRepository.findAll()).thenReturn(vehicles);

        Iterable<Vehicle> result = vehicleController.getVehicles();
        assertNotNull(result);
        assertIterableEquals(vehicles, result);
        verify(vehicleRepository).findAll();
    }

    @Test
    void deleteVehicle_deletesById() {
        Long id = 1L;
        ResponseEntity<Void> response = vehicleController.deleteVehicle(id);
    assertEquals(204, response.getStatusCode().value());
        verify(vehicleRepository).deleteById(id);
    }

    @Test
    void addVehicle_savesAndReturnsVehicle() {
        Vehicle vehicle = new Vehicle();
        when(vehicleRepository.save(vehicle)).thenReturn(vehicle);

        ResponseEntity<Vehicle> response = vehicleController.addVehicle(vehicle);
    assertEquals(201, response.getStatusCode().value());
        assertEquals(vehicle, response.getBody());
        verify(vehicleRepository).save(vehicle);
    }
}
