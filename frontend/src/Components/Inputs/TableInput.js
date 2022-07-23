function TableInput({ placeholder, type, value, onChange, label, disabled }) {
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
        />
      </label>
    </div>
  );
}

export default TableInput;
