import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL;

export const getStaff = async () => {
  const response = await axios.get(`${BASE}/api/staff`);
  return response.data;
};

export const addStaff = async (staff) => {
  const response = await axios.post(`${BASE}/api/staff`, staff, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const deleteStaff = async (id) => {
  await axios.delete(`${BASE}/api/staff/${id}`);
};
