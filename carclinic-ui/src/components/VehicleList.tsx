import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import AddVehicle from './AddVehicle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';

import { getVehicles, deleteVehicle, addVehicle } from '../api/vehicleapi';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function VehicleList() {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles
  });

  const { mutate } = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      setSnackbarOpen(true);
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: addVehicle,
    onSuccess: () => {
      setAddDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleAddVehicle = (vehicle: any) => {
    addMutate(vehicle);
  };

  const columns: GridColDef[] = [
    {
      field: 'vin',
      headerName: 'VIN',
      width: 200,
      editable: true,
    },
    {
      field: 'make',
      headerName: 'Make',
      width: 120,
      editable: true,
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 120,
      editable: true,
    },
    {
      field: 'color',
      headerName: 'Color',
      width: 100,
      editable: true,
    },
    {
      field: 'year',
      headerName: 'Year',
      width: 100,
      editable: true,
    },
    {
      field: 'mileage',
      headerName: 'Mileage',
      width: 100,
      editable: true,
    },
    {
      field: 'lastServiceDate',
      headerName: 'Last Service Date',
      width: 150,
      editable: true,
    },
    {
      field: 'nextServiceDate',
      headerName: 'Next Service Date',
      width: 150,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            sx={{ color: '#1976d2', mr: 1 }}
            onClick={() => {
              const vehicleId = params.id;
              console.log(`Edit vehicle with ID: ${vehicleId}`);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            data-testid="delete-vehicle-button"
            aria-label="delete"
            size="small"
            sx={{ color: '#d32f2f' }}
            onClick={() => {
              const vehicleId = params.id;
              if (window.confirm('Are you sure you want to delete this vehicle?')) {
                mutate(params.row.id);
              }
              console.log(`Delete vehicle with ID: ${vehicleId}`);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Stack spacing={2}>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button data-testid="add-vehicle-button" variant="contained" color="success" sx={{ width: 200 }} onClick={() => setAddDialogOpen(true)}>
          Add Vehicle
        </Button>
      </Box>
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <AddVehicle onAdd={handleAddVehicle} />
      </Dialog>
      {isLoading ? (
        <span>Loading...</span>
      ) : isError ? (
        <span>Error loading data</span>
      ) : isSuccess ? (
        <Paper sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            disableRowSelectionOnClick
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 10]}
            getRowId={row => row.id}
            sx={{
              '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                outline: 'none',
              },
              '& .MuiDataGrid-cell--editing': {
                outline: 'none',
              },
            }}
          />
          <Snackbar
            data-testid="snackbar-vehicle-deleted"
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message="Vehicle deleted"
          />
        </Paper>
      ) : null}
    </Stack>
  );
}

export default VehicleList;
