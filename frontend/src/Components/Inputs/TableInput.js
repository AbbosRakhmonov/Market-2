function TableInput({ placeholder, type, value, onChange, label }) {
  return (
    <div>
      <label>
        {label}
        <input
          className='tableInput'
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
