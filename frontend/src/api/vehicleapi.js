import axios from 'axios';

export const getVehicles = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicles`);

  return response.data;
}

export const deleteVehicle = async (id) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/api/vehicles/${id}`);
}

export const addVehicle = async (vehicle) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/vehicles`, vehicle, {
    headers: {'Content-Type': 'application/json', },
  });

  return response.data;
}

export const updateVehicle = async (id, vehicle) => {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/vehicles/${id}`, vehicle, {
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.data;
}
