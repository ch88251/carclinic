import apiClient from './httpClient';

export const getStaff = async () => {
  const response = await apiClient.get('/api/staff');
  return response.data;
};

export const addStaff = async (staff) => {
  const response = await apiClient.post('/api/staff', staff, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const deleteStaff = async (id) => {
  await apiClient.delete(`/api/staff/${id}`);
};
