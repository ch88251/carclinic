import axios from 'axios';

export const getAppointments = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/appointments`);
  return response.data;
};

export const addAppointment = async (appointment) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/appointments`, appointment, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const deleteAppointment = async (id) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/api/appointments/${id}`);
};

export const getOwners = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/owners`);
  return response.data;
};

export const getStaff = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/staff`);
  return response.data;
};
