function TableInput({ placeholder, type, value, onChange }) {
  return (
    <div>
      <input
        className='w-full pt-[5px] pb-[5px] pr-[5px] pl-[5px] rounded-[0.25rem] border-2 border-blue-200 outline-0 font-roboto text-sm shadow-[ 0px 10px 10px rgba(0, 0, 0, 0.05)] text-right'
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange} 
      />
    </div>
  );
}

export default TableInput;
