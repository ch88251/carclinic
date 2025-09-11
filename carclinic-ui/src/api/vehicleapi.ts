import type { VehicleResponse, Vehicle, VehicleEntry } from '../types';
import axios from 'axios';

export const getVehicles = async (): Promise<VehicleResponse[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles`);

  return response.data._embedded.vehicles;
}

export const deleteVehicle = async (link: string): Promise<VehicleResponse> => {
  const response = await axios.delete(link);
  
  return response.data;
}

export const addVehicle = async (vehicle: Vehicle): Promise<VehicleResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vehicles`, vehicle, {
    headers: {'Content-Type': 'application/json', },
  });

  return response.data;
}

export const updateVehicle = async (vehicleEntry: VehicleEntry): Promise<VehicleResponse> => {
  const response = await axios.put(vehicleEntry.url, vehicleEntry.vehicle, {
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.data;
}
