import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainContent from './mainContent/MainContent';
import AuthScreen from './auth/Auth';
import PrivateRoutes from './utils/PrivateRoute';
import { AuthProvider } from './utils/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<MainContent />} />
          </Route>
          <Route path="/auth" element={<AuthScreen />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
