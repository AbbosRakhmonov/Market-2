import { IoSearchOutline } from 'react-icons/io5';

function SearchInput({ placeholder, type, value, onChange, label }) {
  return (
    <div>
      <label>{label}</label>
      <div className='relative'>
        <input
          className='searchInput shadow-[ 0px 10px 10px rgba(0, 0, 0, 0.05)]'
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />
        <IoSearchOutline className='searchIcon' />
      </div>
    </div>
  );
}

export default SearchInput;
