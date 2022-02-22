import React from 'react';
import './ErrorLabel.css'

// Be careful! Don't remove name & data-testid props, it will be used for tests.

export const ErrorLabel = ({ errors, name = 'global' }) => {
  if (!errors?.length) {
    return null;
  }
  const mapedError = [errors]

  return (
    <div className="error_container" data-testid={`${name}-error-container`}>
      {mapedError.map(( message ) => (
        <span style={{ display: 'block'}} key={Math.random().toString} className="error_message">
          {message}
        </span>
      ))}
    </div>
  );
};
