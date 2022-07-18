import React from 'react';

const LoginButton = (onClick) => {
  return (
    <div>
      <button onClick={onClick} className='LoginBtn'>
        Login
      </button>
    </div>
  );
};

export default LoginButton;
