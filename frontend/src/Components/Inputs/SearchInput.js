import { IoSearchOutline } from 'react-icons/io5';

function SearchInput({ placeholder, type, value, onChange }) {
  return (
    <div>
      <input
        className='w-full pt-[0.625rem] pb-[0.625rem] pl-[2rem] rounded-[0.25rem] border-2 border-blue-200 outline-0 font-roboto text-sm shadow-[ 0px 10px 10px rgba(0, 0, 0, 0.05)]'
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
      <IoSearchOutline className='absolute top-[0.875rem] left-[0.625rem] w-[1.125rem] h-[1.125rem] text-blue-200' />
    </div>
  );
}

export default SearchInput;
