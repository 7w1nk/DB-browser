import React from 'react';

const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className="button">
      <span>{children}</span>
    </button>
  );
};

export default MyButton;