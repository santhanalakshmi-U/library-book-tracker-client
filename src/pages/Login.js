import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(email, password, role);
    if (result.success) {
      if (role === 'Admin') {
        navigate('/');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white text-center py-4 rounded-top-4">
              <h2 className="fw-bold mb-0">Library Login</h2>
            </div>
            <div className="card-body p-5">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email / Username</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Password</label>
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Select Role</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="role" 
                        id="roleMember" 
                        value="Member"
                        checked={role === 'Member'}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="roleMember">Member</label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="role" 
                        id="roleAdmin" 
                        value="Admin"
                        checked={role === 'Admin'}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="roleAdmin">Admin</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm py-3">
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <div className="text-center mt-4 text-muted">
            <small>Demo: Admin (admin@test.com/admin123) | Member (any/member123)</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
