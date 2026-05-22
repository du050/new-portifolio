import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminPanelPage } from './pages/admin/AdminPanelPage';
import { HomePage } from './pages/HomePage';
import { ProjectDetailRoute } from './pages/ProjectDetailRoute';

export default function App(): React.JSX.Element {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailRoute />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminPanelPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
