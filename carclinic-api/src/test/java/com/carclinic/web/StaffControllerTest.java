package com.carclinic.web;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import com.carclinic.domain.Staff;
import com.carclinic.domain.StaffRepository;

public class StaffControllerTest {
    
    @Mock
    private StaffRepository staffRepository;

    @InjectMocks
    private StaffController staffController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getStaff_returnsAllStaff() {
        Staff s1 = new Staff();
        Staff s2 = new Staff();
        Iterable<Staff> staffList = List.of(s1, s2);
        when(staffRepository.findAll()).thenReturn(staffList);
        Iterable<Staff> result = staffController.getStaff();
        assertNotNull(result);
        assertIterableEquals(staffList, result);
        verify(staffRepository).findAll();
    }

    @Test
    void deleteStaff_deletesById() {
        Long id = 1L;
        ResponseEntity<Void> response = staffController.deleteStaff(id);
        assertEquals(204, response.getStatusCode().value());
        verify(staffRepository).deleteById(id);
    }

    @Test
    void addStaff_savesAndReturnsStaff() {
        Staff staff = new Staff();
        when(staffRepository.save(staff)).thenReturn(staff);
        ResponseEntity<Staff> response = staffController.addStaff(staff);
        assertEquals(200, response.getStatusCode().value());
        assertEquals(staff, response.getBody());
        verify(staffRepository).save(staff);
    }

}
