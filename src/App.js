import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AvailableBooks from './pages/AvailableBooks';
import IssuedBooks from './pages/IssuedBooks';
import StudentList from './pages/StudentList';
import PenaltyHistory from './pages/PenaltyHistory';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/available" element={
            <ProtectedRoute>
              <AvailableBooks />
            </ProtectedRoute>
          } />
          
          <Route path="/issued" element={
            <ProtectedRoute>
              <IssuedBooks />
            </ProtectedRoute>
          } />
          
          <Route path="/students" element={
            <ProtectedRoute allowedRole="Admin">
              <StudentList />
            </ProtectedRoute>
          } />

          <Route path="/penalties" element={
            <ProtectedRoute>
              <PenaltyHistory />
            </ProtectedRoute>
          } />
          
          <Route path="/about" element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
