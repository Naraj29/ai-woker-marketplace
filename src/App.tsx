import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WorkerProvider } from './contexts/WorkerContext';
import { ChatProvider } from './contexts/ChatContext';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { WorkerDetail } from './pages/WorkerDetail';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#080910', color: '#a5b4fc',
        fontSize: 16, fontWeight: 700, fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        Loading WorkerX AI...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <WorkerProvider>
          <ChatProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Home />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/worker/:id"
                element={
                  <ProtectedRoute>
                    <WorkerDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Profile />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ChatProvider>
        </WorkerProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppContent;