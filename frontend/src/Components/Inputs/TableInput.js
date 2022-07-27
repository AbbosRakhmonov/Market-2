function TableInput({ placeholder, type, value, onChange, label, disabled,onKeyUp }) {
  return (
    <div>
      <label>
        {label}
        <input
          disabled={disabled}
          className="tableInput"
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
      </label>
    </div>
  );
}

export default TableInput;
