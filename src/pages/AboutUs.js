import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-page pb-5">
      {/* Hero Header */}
      <div className="bg-dark text-white text-center py-5 mb-5">
        <div className="container py-3">
          <h1 className="display-4 fw-bold mb-3">About Library Book Tracker</h1>
          <p className="lead fs-4 opacity-75">Streamlining knowledge management for modern institutions.</p>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <h2 className="mb-4">Our Mission</h2>
            <p className="fs-5 text-muted">
              The Library Book Tracker is designed to bridge the gap between traditional library services and digital efficiency. 
              Our goal is to provide a seamless experience for both administrators and members, ensuring that every book is 
              accounted for and every student has access to the resources they need.
            </p>
          </div>
          <div className="col-lg-6 text-center">
            <i className="bi bi-book-half text-primary display-1"></i>
          </div>
        </div>

        {/* Roles Section */}
        <h2 className="text-center mb-4 border-0 p-0">System Roles</h2>
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm p-4 role-card border-top border-primary border-5">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-shield-lock-fill text-primary fs-1 me-3"></i>
                <h3 className="mb-0 fw-bold">Administrator</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent border-0 px-0">
                  <i className="bi bi-check2-circle text-success me-2"></i>Full CRUD control over the book collection
                </li>
                <li className="list-group-item bg-transparent border-0 px-0">
                  <i className="bi bi-check2-circle text-success me-2"></i>Manage student profiles and departments
                </li>
                <li className="list-group-item bg-transparent border-0 px-0">
                  <i className="bi bi-check2-circle text-success me-2"></i>Monitor issued books and pending returns
                </li>
                <li className="list-group-item bg-transparent border-0 px-0">
                  <i className="bi bi-check2-circle text-success me-2"></i>Process manual book registrations
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm p-4 role-card border-top border-success border-5">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-person-badge-fill text-success fs-1 me-3"></i>
                <h3 className="mb-0 fw-bold">Library Member</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent border-0 px-0">
                  <i className="bi bi-check2-circle text-success me-2"></i>Real-time search across the entire catalog
                </li>
                <li className="list-group-item bg-transparent border-0 px-0">
                  <i className="bi bi-check2-circle text-success me-2"></i>Check instant availability of any book
                </li>
                <li className="list-group-item bg-transparent border-0 px-0">
                  <i className="bi bi-check2-circle text-success me-2"></i>Request books for immediate borrowing
                </li>
                <li className="list-group-item bg-transparent border-0 px-0">
                  <i className="bi bi-check2-circle text-success me-2"></i>View personal borrowing history and status
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features / Policy Section */}
        <div className="bg-white p-5 rounded-4 shadow-sm border-start border-danger border-5">
          <div className="row">
            <div className="col-md-8">
              <h3 className="fw-bold mb-3">Borrowing Policy & Penalties</h3>
              <p className="text-muted"> To ensure fair access for all members, we maintain a strict return policy:</p>
              <div className="d-flex flex-wrap gap-4 mt-4">
                <div className="policy-item">
                  <span className="fw-bold text-dark d-block">Period</span>
                  <span className="badge bg-info text-dark">7 Days</span>
                </div>
                <div className="policy-item">
                  <span className="fw-bold text-dark d-block">Daily Fine</span>
                  <span className="badge bg-danger">₹5 / Day</span>
                </div>
                <div className="policy-item">
                  <span className="fw-bold text-dark d-block">Grace Period</span>
                  <span className="badge bg-secondary">None</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <i className="bi bi-exclamation-triangle text-danger display-4"></i>
                <p className="fw-bold mt-2 text-danger">Avoid Late Fees!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
