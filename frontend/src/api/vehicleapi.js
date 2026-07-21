import apiClient from './httpClient';

export const getVehicles = async () => {
  const response = await apiClient.get('/api/vehicles');
  return response.data;
};

export const deleteVehicle = async (id) => {
  await apiClient.delete(`/api/vehicles/${id}`);
};

export const addVehicle = async (vehicle) => {
  const response = await apiClient.post('/api/vehicles', vehicle, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const updateVehicle = async (id, vehicle) => {
  const response = await apiClient.put(`/api/vehicles/${id}`, vehicle, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
