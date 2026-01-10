import React, { useState, useEffect, useContext } from 'react';
import { getAvailableBooks, getStudents, issueBook, createBook } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

const AvailableBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', isbn: '', image: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksRes, studentsRes] = await Promise.all([
        getAvailableBooks(),
        getStudents()
      ]);
      setBooks(booksRes.data);
      setStudents(studentsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleIssue = async (bookId, studentId) => {
    try {
      await issueBook(bookId, studentId);
      alert('Book issued successfully!');
      fetchData(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.message || 'Error issuing book');
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await createBook(newBook);
      alert('Book added successfully!');
      setNewBook({ title: '', isbn: '', image: '' });
      setShowAddForm(false);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding book');
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm)
  );

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Books</h2>
        {user?.role === 'Admin' && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add New Book'}
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">New Book Details</h5>
            <form onSubmit={handleAddBook}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newBook.title}
                    onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">ISBN</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({...newBook, isbn: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Image URL</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="https://example.com/image.jpg"
                    value={newBook.image}
                    onChange={(e) => setNewBook({...newBook, image: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success">Save Book</button>
            </form>
          </div>
        </div>
      )}
      
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredBooks.map(book => (
          <div className="col" key={book._id}>
            <BookCard 
              book={book} 
              onAction={handleIssue} 
              actionLabel="Issue" 
              students={students}
            />
          </div>
        ))}
      </div>
      
      {filteredBooks.length === 0 && <p className="text-center mt-4">No books found.</p>}
    </div>
  );
};

export default AvailableBooks;
