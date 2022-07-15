import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

function Input({ placeholder, type, value, onChange, password, show }) {
  const [currentType, setCurrentType] = useState(type);
  const [currentShow, setCurrentShow] = useState(show);
  const changeType = () => {
    setCurrentShow(!currentShow);
    setCurrentType(currentType === 'text' ? 'password' : 'text');
  };

  return (
    <div className='relative'>
      <input
        className='w-full p-[0.625rem] rounded-[0.25rem] border-2 border-blue-100 outline-0 font-roboto text-sm shadow-[ 0px 10px 10px rgba(0, 0, 0, 0.05)]'
        placeholder={placeholder}
        type={currentType}
        value={value}
        onChange={onChange}
      />
      <button onClick={changeType}>
        {password ? (
          currentShow ? (
            <IoEye className='absolute top-[0.875rem] right-[0.625rem] w-[1.125rem] h-[1.125rem] text-blue-700' />
          ) : (
            <IoEyeOff className='absolute top-[0.875rem] right-[0.625rem]  w-[1.125rem] h-[1.125rem] text-blue-700' />
          )
        ) : (
          ''
        )}
      </button>
    </div>
  );
}

export default Input;
