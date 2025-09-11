import React, { useState } from 'react';
import type { Vehicle } from '../types';
import { Box, Button, TextField, Typography } from '@mui/material';

interface AddVehicleProps {
  onAdd: (vehicle: Vehicle) => void;
}

const initialState: Vehicle = {
  vin: '',
  make: '',
  model: '',
  color: '',
  year: 2025,
  mileage: 0,
  lastServiceDate: '',
  nextServiceDate: '',
};

const AddVehicle: React.FC<AddVehicleProps> = ({ onAdd }) => {
  const [vehicle, setVehicle] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(vehicle as Vehicle);
    setVehicle(initialState);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
      <Typography padding={4} variant="h3" gutterBottom>
        Add New Vehicle
      </Typography>
      <Box padding={4}>
        <TextField
          label="VIN"
          name="vin"
          value={vehicle.vin}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Make"
          name="make"
          value={vehicle.make}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Model"
          name="model"
          value={vehicle.model}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Color"
          name="color"
          value={vehicle.color}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Year"
          name="year"
          type="number"
          value={vehicle.year}
          onChange={handleNumberChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mileage"
          name="mileage"
          type="number"
          value={vehicle.mileage}
          onChange={handleNumberChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Service Date"
          name="lastServiceDate"
          type="date"
          value={vehicle.lastServiceDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Next Service Date"
          name="nextServiceDate"
          type="date"
          value={vehicle.nextServiceDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          margin="normal"
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="success">
            Add Vehicle
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddVehicle;
