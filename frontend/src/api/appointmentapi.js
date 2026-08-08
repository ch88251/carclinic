import apiClient from './httpClient';

export const getAppointments = async () => {
  const response = await apiClient.get('/api/appointments');
  return response.data;
};

export const addAppointment = async (appointment) => {
  const response = await apiClient.post('/api/appointments', appointment, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const deleteAppointment = async (id) => {
  await apiClient.delete(`/api/appointments/${id}`);
};

export const getAppointmentServices = async (id) => {
  const response = await apiClient.get(`/api/appointments/${id}/services`);
  return response.data;
};

export const getOwners = async () => {
  const response = await apiClient.get('/api/owners');
  return response.data;
};

export const getStaff = async () => {
  const response = await apiClient.get('/api/staff');
  return response.data;
};
