import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

function Input({ placeholder, forid, type, value, onChange, password, label ,onkeyup}) {
  const [currentShow, setCurrentShow] = useState(false);
  const changeType = () => {
    setCurrentShow(!currentShow);
  };

  return (
    <div className={"input-container"}>
      {label && (
        <label className={"labelClass leading-[1.125rem]"}>{label}</label>
      )}
      <div className="relative">
        <input
          className="inputClass shadow-[0_10px_10px_rgba(0,0,0,0.05)] leading-[1.125rem]"
          placeholder={placeholder}
          id={forid}
          type={currentShow ? "text" : type}
          value={value}
          onChange={onChange}
          onkeyup={onkeyup}
        />
        {password && (
          <button className={"iconButton"} type={"button"} onClick={changeType}>
            {currentShow ? (
              <IoEye className="iconClass" />
            ) : (
              <IoEyeOff className="iconClass" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
