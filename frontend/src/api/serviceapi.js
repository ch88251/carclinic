import apiClient from './httpClient';

export const getServiceTypes = async () => {
  const response = await apiClient.get('/api/service-types');
  return response.data;
};

export const bookServices = async (booking) => {
  const response = await apiClient.post('/api/service-bookings', booking, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};
