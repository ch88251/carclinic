package com.carclinic.web;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import com.carclinic.domain.ServiceAppointment;
import com.carclinic.domain.ServiceAppointmentRepository;

public class AppointmentControllerTest {

    @Mock
    private ServiceAppointmentRepository repository;

    @Mock
    private ServiceAppointmentMapper serviceAppointmentMapper;

    @InjectMocks
    private AppointmentController appointmentController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAppointments_returnsAllAppointments() {
        ServiceAppointment a1 = new ServiceAppointment();
        ServiceAppointment a2 = new ServiceAppointment();
        Iterable<ServiceAppointment> appointments = List.of(a1, a2);
        ServiceAppointmentDto dto1 = new ServiceAppointmentDto();
        ServiceAppointmentDto dto2 = new ServiceAppointmentDto();
        when(repository.findAll()).thenReturn(appointments);
        when(serviceAppointmentMapper.toServiceAppointmentDto(a1)).thenReturn(dto1);
        when(serviceAppointmentMapper.toServiceAppointmentDto(a2)).thenReturn(dto2);

        List<ServiceAppointmentDto> result = appointmentController.getAppointments();

        assertNotNull(result);
        assertIterableEquals(List.of(dto1, dto2), result);
        verify(repository).findAll();
    }

    @Test
    void deleteAppointment_deletesById() {
        Long id = 5L;

        ResponseEntity<Void> response = appointmentController.deleteAppointment(id);

        assertEquals(204, response.getStatusCode().value());
        verify(repository).deleteById(id);
    }

    @Test
    void addAppointment_savesAndReturnsCreated() {
        ServiceAppointmentFieldsDto request = new ServiceAppointmentFieldsDto(
                1L, 2L, 3L, LocalDate.of(2026, 6, 1), "SCHEDULED", "Check brakes");
        ServiceAppointment appointment = new ServiceAppointment();
        ServiceAppointmentDto responseDto = new ServiceAppointmentDto();
        when(serviceAppointmentMapper.toServiceAppointment(request)).thenReturn(appointment);
        when(serviceAppointmentMapper.toServiceAppointmentDto(appointment)).thenReturn(responseDto);

        ResponseEntity<ServiceAppointmentDto> response = appointmentController.addAppointment(request);

        assertEquals(201, response.getStatusCode().value());
        assertEquals(responseDto, response.getBody());
        verify(repository).save(appointment);
    }

    @Test
    void addAppointment_withoutStaff_savesAndReturnsCreated() {
        ServiceAppointmentFieldsDto request = new ServiceAppointmentFieldsDto(
                1L, 2L, null, LocalDate.of(2026, 6, 1), "SCHEDULED", null);
        ServiceAppointment appointment = new ServiceAppointment();
        ServiceAppointmentDto responseDto = new ServiceAppointmentDto();
        when(serviceAppointmentMapper.toServiceAppointment(request)).thenReturn(appointment);
        when(serviceAppointmentMapper.toServiceAppointmentDto(appointment)).thenReturn(responseDto);

        ResponseEntity<ServiceAppointmentDto> response = appointmentController.addAppointment(request);

        assertEquals(201, response.getStatusCode().value());
        assertEquals(responseDto, response.getBody());
        verify(repository).save(appointment);
    }
}
