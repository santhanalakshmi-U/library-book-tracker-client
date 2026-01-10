import React, { useState, useEffect } from 'react';
import { getIssuedBooks, returnBook } from '../services/api';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

const IssuedBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getIssuedBooks();
      setBooks(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      const res = await returnBook(bookId);
      alert(`Book returned successfully! Penalty: ₹${res.data.penalty}`);
      fetchData(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.message || 'Error returning book');
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
        <h2>Issued Books</h2>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredBooks.map(book => (
          <div className="col" key={book._id}>
            <BookCard 
              book={book} 
              onAction={handleReturn} 
              actionLabel="Return" 
            />
          </div>
        ))}
      </div>
      
      {filteredBooks.length === 0 && <p className="text-center mt-4">No issued books found.</p>}
    </div>
  );
};

export default IssuedBooks;
