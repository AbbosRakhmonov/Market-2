import {IoSearchOutline} from 'react-icons/io5';

function SearchInput({placeholder, value, onChange, someClasses}) {
    return (
        <div
            className={`searchInput-container shadow-[0_10px_10px_rgba(0,0,0,0.05)] flex items-center ${someClasses ? someClasses : ""}`}>
            <IoSearchOutline className='searchIcon text-[1.31rem] text-blue-200'/>
            <input
                className='leading-[1.125rem] transition-all ease-in-out duration-100 px-[8px] py-[0.625rem] w-full bg-transparent outline-none'
                placeholder={placeholder}
                type={"search"}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchInput;