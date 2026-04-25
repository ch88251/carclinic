import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VehicleList from '../VehicleList/VehicleList';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <nav className="app-navbar">
        <h1>Car Clinic</h1>
      </nav>
      <main className="app-content">
        <QueryClientProvider client={queryClient}>
          <VehicleList />
        </QueryClientProvider>
      </main>
    </div>
  );
}

export default App;
