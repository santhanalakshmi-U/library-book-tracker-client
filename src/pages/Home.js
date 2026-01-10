import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { createBook } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', isbn: '', image: '' });

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await createBook(newBook);
      alert('Book added successfully!');
      setNewBook({ title: '', isbn: '', image: '' });
      setShowAddForm(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding book');
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section bg-primary text-white text-center py-5 mb-5 shadow">
        <div className="container py-4">
          <h1 className="display-3 fw-bold mb-3">Your Modern Library Assistant</h1>
          <p className="lead mb-4 fs-4">Track books, manage students, and handle penalties with ease.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/available" className="btn btn-light btn-lg px-4 fw-bold text-primary">Browse Books</Link>
            {user?.role === 'Admin' && (
              <button 
                className="btn btn-outline-light btn-lg px-4 fw-bold"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? 'Close Form' : 'Add New Book'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Add Book Form Section */}
        {showAddForm && (
          <div className="row justify-content-center mb-5">
            <div className="col-md-6">
              <div className="card shadow-lg border-0 animate-fade-in">
                <div className="card-header bg-success text-white py-3">
                  <h5 className="card-title mb-0 fw-bold">
                    <i className="bi bi-plus-circle me-2"></i>Add New Book to Library
                  </h5>
                </div>
                <div className="card-body p-4">
                  <form onSubmit={handleAddBook}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Book Title</label>
                      <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder="e.g. The Great Gatsby"
                        value={newBook.title}
                        onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">ISBN Number</label>
                      <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder="e.g. 9780743273565"
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Cover Image URL</label>
                      <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder="https://example.com/cover.jpg"
                        value={newBook.image}
                        onChange={(e) => setNewBook({...newBook, image: e.target.value})}
                      />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg w-100 py-3 fw-bold shadow-sm">
                      Register Book
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center p-4 feature-card">
              <div className="feature-icon mb-3">
                <i className="bi bi-journal-text text-primary display-4"></i>
              </div>
              <h4 className="fw-bold">Book Inventory</h4>
              <p className="text-muted">Manage your entire collection of books. Track availability and details in real-time.</p>
              <Link to="/available" className="btn btn-link text-decoration-none fw-bold mt-auto">View Inventory →</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center p-4 feature-card">
              <div className="feature-icon mb-3">
                <i className="bi bi-people text-success display-4"></i>
              </div>
              <h4 className="fw-bold">Student Records</h4>
              <p className="text-muted">Keep track of students, their borrowed books, and academic departments.</p>
              <Link to="/students" className="btn btn-link text-decoration-none fw-bold mt-auto">Manage Students →</Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center p-4 feature-card">
              <div className="feature-icon mb-3">
                <i className="bi bi-currency-rupee text-danger display-4"></i>
              </div>
              <h4 className="fw-bold">Penalty Tracking</h4>
              <p className="text-muted">Automatic penalty calculation for late returns. Keep track of all pending dues.</p>
              <Link to="/issued" className="btn btn-link text-decoration-none fw-bold mt-auto">Check Penalties →</Link>
            </div>
          </div>
        </div>

        {/* Quick Stats/Info */}
        <div className="bg-light p-5 rounded-4 mb-5 shadow-sm text-center">
          <h2 className="border-0 p-0 mb-4">How it Works</h2>
          <div className="row">
            <div className="col-md-3">
              <div className="fw-bold fs-1 text-primary">1</div>
              <p className="fw-bold mb-1">Add Books</p>
              <p className="small text-muted">Register new books with ISBN and images.</p>
            </div>
            <div className="col-md-3">
              <div className="fw-bold fs-1 text-primary">2</div>
              <p className="fw-bold mb-1">Issue</p>
              <p className="small text-muted">Assign available books to students.</p>
            </div>
            <div className="col-md-3">
              <div className="fw-bold fs-1 text-primary">3</div>
              <p className="fw-bold mb-1">Track</p>
              <p className="small text-muted">Monitor due dates and book status.</p>
            </div>
            <div className="col-md-3">
              <div className="fw-bold fs-1 text-primary">4</div>
              <p className="fw-bold mb-1">Return</p>
              <p className="small text-muted">Process returns and update penalties.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
