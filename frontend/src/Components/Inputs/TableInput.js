function TableInput({ placeholder, type, value, onChange ,label}) {
  return (
    <div>
      <label>{label}</label>
      <input
        className='tableInput'
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange} 
      />
    </div>
  );
}

export default TableInput;
