import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// Placeholder – replace with auth context when Keycloak is integrated
const MOCK_USER = { name: 'Jane Doe', initials: 'JD' };

function AppLayout() {
  return (
    <>
      <Navbar user={MOCK_USER} onLogin={() => {}} onLogout={() => {}} />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
