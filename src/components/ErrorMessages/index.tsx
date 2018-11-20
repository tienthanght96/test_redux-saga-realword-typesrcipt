import * as React from 'react';

interface ErrorProps {
  errors: Array<string>
}

const ErrorMessages: React.SFC<ErrorProps> = ({ errors }) => {
  
  if(!Array.isArray(errors) || errors.length < 1) return null;
  
  return (  
    <ul className="error-messages">
      { errors.map((error, index) => <li key={index}>{error}</li>)}
    </ul>
  );
}

export default ErrorMessages;