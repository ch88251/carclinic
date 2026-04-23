import type { VehicleResponse, Vehicle, VehicleEntry } from '../types';
import axios from 'axios';

export const getVehicles = async (): Promise<VehicleResponse[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles`);

  return response.data;
}

export const deleteVehicle = async (id: number): Promise<void> => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/api/vehicles/${id}`);
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
