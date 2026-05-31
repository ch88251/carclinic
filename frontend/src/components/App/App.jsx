import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../AppLayout/AppLayout';
import LandingPage from '../../pages/LandingPage/LandingPage';
import VehicleListPage from '../../pages/VehicleListPage/VehicleListPage';
import AppointmentListPage from '../../pages/AppointmentListPage/AppointmentListPage';
import ScheduleAppointmentPage from '../../pages/ScheduleAppointmentPage/ScheduleAppointmentPage';
import StaffListPage from '../../pages/StaffListPage/StaffListPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/vehicles" element={<VehicleListPage />} />
          <Route path="/appointments" element={<AppointmentListPage />} />
          <Route path="/appointments/new" element={<ScheduleAppointmentPage />} />
          <Route path="/staff" element={<StaffListPage />} />
          {/* Redirect unimplemented routes back to home until pages are built */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
