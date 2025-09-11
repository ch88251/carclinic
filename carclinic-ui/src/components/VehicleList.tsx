import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';

import { getVehicles, deleteVehicle } from '../api/vehicleapi';
import { useState } from 'react';

function VehicleList() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
            aria-label="delete"
            size="small"
            sx={{ color: '#d32f2f' }}
            onClick={() => {
              const vehicleId = params.id;
              if (window.confirm('Are you sure you want to delete this vehicle?')) {
                mutate(params.row._links.vehicle.href);
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

  const paginationModel = { page: 0, pageSize: 5 };

  if (isLoading) {
    return <span>Loading...</span>
  } else if (isError) {
    return <span>Error loading data</span>
  } else if (isSuccess) {
    return (
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          getRowId={row => row._links.self.href}
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
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Vehicle deleted"
        />
      </Paper>
    );
  }
}

export default VehicleList;
