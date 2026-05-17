import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../AppLayout/AppLayout';
import LandingPage from '../../pages/LandingPage/LandingPage';
import VehicleListPage from '../../pages/VehicleListPage/VehicleListPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/vehicles" element={<VehicleListPage />} />
          {/* Redirect unimplemented routes back to home until pages are built */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
