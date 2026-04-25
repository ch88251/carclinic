import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const initialState = {
  vin: '',
  make: '',
  model: '',
  color: '',
  year: 2025,
  mileage: 0,
  lastServiceDate: '',
  nextServiceDate: '',
};

const AddVehicle = ({ onAdd }) => {
  const [vehicle, setVehicle] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(vehicle);
    setVehicle(initialState);
  };

  return (
    <Box data-testid="vehicle-form" component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
      <Typography padding={4} variant="h3" gutterBottom>
        Add New Vehicle
      </Typography>
      <Box padding={4}>
        <TextField
          data-testid="txt-vin"
          label="VIN"
          name="vin"
          value={vehicle.vin}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          data-testid="make"
          label="Make"
          name="make"
          value={vehicle.make}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          data-testid="model"
          label="Model"
          name="model"
          value={vehicle.model}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          data-testid="color"
          label="Color"
          name="color"
          value={vehicle.color}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          data-testid="year"
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
          data-testid="mileage"
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
          data-testid="lastServiceDate"
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
          data-testid="nextServiceDate"
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
          <Button data-testid="save-vehicle-button" type="submit" variant="contained" color="success">
            Save Vehicle
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddVehicle;
