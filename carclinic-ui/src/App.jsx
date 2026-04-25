import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import VehicleList from './components/VehicleList';
import { Box } from '@mui/material';

const queryClient = new QueryClient();


function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f5f5f5',
      }}
    >
      <CssBaseline />
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar sx={{ justifyContent: 'left' }}>
          <Typography variant="h5">
            Car Clinic
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <QueryClientProvider client={queryClient}>
          <VehicleList />
        </QueryClientProvider>
      </Container>
    </Box>
  );
}

export default App
