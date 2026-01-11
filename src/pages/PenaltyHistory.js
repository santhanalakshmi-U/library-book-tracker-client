import React, { useState, useEffect, useContext } from 'react';
import { getPenalties, markPenaltyAsPaid } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const PenaltyHistory = () => {
  const { user } = useContext(AuthContext);
  const [penalties, setPenalties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPenalties();
  }, []);

  const fetchPenalties = async () => {
    try {
      const res = await getPenalties();
      setPenalties(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching penalties:', error);
      setLoading(false);
    }
  };

  const handlePay = async (id) => {
    if (!window.confirm('Mark this penalty as Paid?')) return;
    try {
      await markPenaltyAsPaid(id);
      alert('Penalty marked as paid!');
      fetchPenalties();
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating penalty');
    }
  };

  if (loading) return <div className="container mt-4">Loading history...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Penalty History</h2>
      
      <div className="table-responsive">
        <table className="table table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Student</th>
              <th>Book</th>
              <th>Amount</th>
              <th>Status</th>
              {user?.role === 'Admin' && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {penalties.map(p => (
              <tr key={p._id}>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td>
                  <div>{p.student?.name}</div>
                  <small className="text-muted">{p.student?.department}</small>
                </td>
                <td>{p.book?.title}</td>
                <td className="fw-bold text-danger">₹{p.amount}</td>
                <td>
                  <span className={`badge ${p.status === 'Paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {p.status}
                  </span>
                  {p.status === 'Paid' && p.paidAt && (
                    <div className="small text-muted mt-1">
                      Paid on: {new Date(p.paidAt).toLocaleDateString()}
                    </div>
                  )}
                </td>
                {user?.role === 'Admin' && (
                  <td>
                    {p.status === 'Unpaid' && (
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => handlePay(p._id)}
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {penalties.length === 0 && (
        <p className="text-center mt-4">No penalty records found.</p>
      )}
    </div>
  );
};

export default PenaltyHistory;