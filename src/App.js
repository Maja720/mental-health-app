import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-blue-50/50">
          <Header />

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

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
