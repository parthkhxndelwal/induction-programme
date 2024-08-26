import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="text-danger m-2 w-30 text-center" role="alert">
    {message}
  </div>
);

export default ErrorMessage;
