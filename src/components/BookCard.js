import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const BookCard = ({ book, onAction, actionLabel, students }) => {
  const { user } = useContext(AuthContext);
  const [selectedStudent, setSelectedStudent] = React.useState('');

  const handleAction = () => {
    if (actionLabel === 'Issue') {
      if (!selectedStudent) {
        alert('Please select a student');
        return;
      }
      onAction(book._id, selectedStudent);
    } else {
      onAction(book._id);
    }
  };

  const defaultImage = 'https://placehold.co/200x300?text=No+Cover';

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <div className="card h-100 shadow-sm book-card">
      <div className="book-image-container">
        <img 
          src={book.image || defaultImage} 
          className="card-img-top book-image" 
          alt={book.title}
          onError={handleImageError}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text mb-1"><strong>ISBN:</strong> {book.isbn}</p>
        <p className="card-text mb-1">
          <span className={`badge ${book.status === 'available' ? 'bg-success' : 'bg-warning text-dark'}`}>
            {book.status.toUpperCase()}
          </span>
        </p>
        
        {book.status === 'issued' && book.issuedTo && (
          <p className="card-text mb-1 small">
            <strong>Issued To:</strong> {book.issuedTo.name}
          </p>
        )}
        
        {book.penalty > 0 && (
          <p className="card-text mb-1 text-danger small">
            <strong>Last Penalty:</strong> ₹{book.penalty}
          </p>
        )}

        {user?.role === 'Admin' && (
          <div className="mt-auto">
            {actionLabel === 'Issue' && (
              <select 
                className="form-select form-select-sm mb-2"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Select Student</option>
                {students && students.map(student => (
                  <option key={student._id} value={student._id}>{student.name}</option>
                ))}
              </select>
            )}
            <button 
              className={`btn btn-sm w-100 ${actionLabel === 'Issue' ? 'btn-primary' : 'btn-danger'}`}
              onClick={handleAction}
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
