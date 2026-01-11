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

  return (
    <div className="card h-100 shadow-sm book-card">
      {book.image && (
        <div className="book-image-container bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
          <img 
            src={book.image} 
            className="card-img-top book-image" 
            alt={book.title}
            style={{ maxHeight: '100%', objectFit: 'contain' }}
          />
        </div>
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text mb-1"><strong>ISBN:</strong> {book.isbn}</p>
        <p className="card-text mb-1">
          <span className={`badge ${book.status === 'available' ? 'bg-success' : 'bg-warning text-dark'}`}>
            {book.status.toUpperCase()}
          </span>
        </p>
        
        {book.status === 'issued' && book.issuedTo && (
          <div className="mt-2 small border-top pt-2">
            <p className="card-text mb-1">
              <strong>Issued To:</strong> {book.issuedTo.name}
            </p>
            <p className="card-text mb-1">
              <strong>Issued Date:</strong> {new Date(book.issuedDate).toLocaleDateString()}
            </p>
            <p className="card-text mb-1">
              <strong>Due Date:</strong> {new Date(new Date(book.issuedDate).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
            {(() => {
              const diffDays = Math.ceil(Math.abs(new Date() - new Date(book.issuedDate)) / (1000 * 60 * 60 * 24));
              const currentPenalty = diffDays > 7 ? (diffDays - 7) * 5 : 0;
              return currentPenalty > 0 ? (
                <p className="card-text mb-1 text-danger fw-bold">
                  <strong>Current Penalty:</strong> ₹{currentPenalty}
                </p>
              ) : (
                <p className="card-text mb-1 text-success small">
                  No penalty yet
                </p>
              );
            })()}
          </div>
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
