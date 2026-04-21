package com.carclinic.web;

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

import com.carclinic.domain.ServiceType;
import com.carclinic.domain.ServiceTypeRepository;

public class ServiceTypeControllerTest {
    
    @InjectMocks
    private ServiceTypeController serviceTypeController;

    @Mock
    private ServiceTypeRepository serviceTypeRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getServiceTypes_returnsAllServiceTypes() {
        List<ServiceType> serviceTypes = List.of(new ServiceType(), new ServiceType());
        when(serviceTypeRepository.findAll()).thenReturn(serviceTypes);
        Iterable<ServiceType> result = serviceTypeController.getServiceTypes();
        assertNotNull(result);
        assertIterableEquals(serviceTypes, result);
        verify(serviceTypeRepository).findAll();
    }

    @Test
    void deleteServiceType_deletesById() {
        Long id = 1L;
        serviceTypeController.deleteServiceType(id);
        verify(serviceTypeRepository).deleteById(id);
    }

    @Test
    void addServiceType_savesAndReturnsServiceType() {
        ServiceType serviceType = new ServiceType();
        when(serviceTypeRepository.save(serviceType)).thenReturn(serviceType);
        serviceTypeController.addServiceType(serviceType);
        verify(serviceTypeRepository).save(serviceType);
    }

}
