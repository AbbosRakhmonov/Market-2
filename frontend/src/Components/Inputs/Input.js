import {useState} from 'react';
import {IoEye, IoEyeOff} from 'react-icons/io5';

function Input({ placeholder, type, value, onChange, password, label }) {
  const [currentShow, setCurrentShow] = useState(false);
  const changeType = () => {
    setCurrentShow(!currentShow);
  };

  return (
    <div>
      <label>
        {label}
        <div className='relative'>
          <input
            className='inputClass shadow-[ 0px 10px 10px rgba(0, 0, 0, 0.05)]'
            placeholder={placeholder}
            type={currentShow ? 'text' : type}
            value={value}
            onChange={onChange}
          />

          <button onClick={changeType}>
            {password ? (
              currentShow ? (
                <IoEye className='iconClass' />
              ) : (
                <IoEyeOff className='iconClass' />
              )
            ) : (
              ''
            )}
          </button>
        </div>
      </label>
    </div>
  );
}

export default Input;
