import React, { useState, useEffect } from 'react';
import { getStudents, createStudent } from '../services/api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', department: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await createStudent(newStudent);
      alert('Student added successfully!');
      setNewStudent({ name: '', department: '' });
      setShowAddForm(false);
      fetchStudents();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding student');
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Student'}
        </button>
      </div>

      {showAddForm && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">New Student</h5>
            <form onSubmit={handleAddStudent}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newStudent.department}
                  onChange={(e) => setNewStudent({...newStudent, department: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Save Student</button>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Past Due Penalty</th>
              <th>Live Issued Penalty</th>
              <th>Total Penalty</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => {
              // Calculate live penalty for currently issued books
              const livePenalty = (student.issuedBooks || []).reduce((acc, book) => {
                const diffDays = Math.ceil(Math.abs(new Date() - new Date(book.issuedDate)) / (1000 * 60 * 60 * 24));
                const penalty = diffDays > 7 ? (diffDays - 7) * 5 : 0;
                return acc + penalty;
              }, 0);

              const totalPenalty = (student.totalPenaltyDue || 0) + livePenalty;

              return (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td className={student.totalPenaltyDue > 0 ? 'text-danger' : ''}>
                    ₹{student.totalPenaltyDue}
                  </td>
                  <td className={livePenalty > 0 ? 'text-warning fw-bold' : ''}>
                    ₹{livePenalty}
                  </td>
                  <td className={totalPenalty > 0 ? 'text-danger fw-bold' : ''}>
                    ₹{totalPenalty}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {students.length === 0 && <p className="text-center mt-4">No students found.</p>}
    </div>
  );
};

export default StudentList;
