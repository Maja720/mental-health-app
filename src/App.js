import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';

import Dashboard from './components/dashboard/Dashboard';
import Journal from './components/journal/Journal';
import Mood from './components/mood/Mood';
import Counselors from './components/counselors/Counselors';
import Groups from './components/groups/Groups';
import Profile from './components/profile/Profile';
import Support from './components/support/Support';

function AppShell() {
  const { user } = useAuth();
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register';
  const showChrome = Boolean(user) && !isAuthPage;

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50/50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-blue-50/50">
      {showChrome && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mood"
          element={
            <ProtectedRoute>
              <Mood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/counselors"
          element={
            <ProtectedRoute>
              <Counselors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {showChrome && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}
