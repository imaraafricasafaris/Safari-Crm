import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import Leads from './pages/Leads';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();

  return user ? (
    <Routes>
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
                duration: 4000,
                style: {
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                },
              }}
            />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/leads" element={<Leads />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* Add more routes here */}
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
