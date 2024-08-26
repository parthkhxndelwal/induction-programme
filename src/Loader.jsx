import React from 'react';

const Loader = () => (
  <div className="d-flex justify-content-center align-items-center bg-dark text-light" style={{ height: '90vh' }}>
    <div className="spinner-grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;
