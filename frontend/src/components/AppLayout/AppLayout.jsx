import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './AppLayout.css';

// Placeholder – replace with auth context when Keycloak is integrated
const MOCK_USER = { name: 'Jane Doe', initials: 'JD' };

function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar user={MOCK_USER} onLogin={() => {}} onLogout={() => {}} />
      <main className="app-layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
