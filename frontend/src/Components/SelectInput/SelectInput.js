import React from 'react';
import Select from 'react-select';
import CustomStyle from './CustomStyle';
import { DropdownIcon } from './CustomStyle';

const SelectInput = ({
  onSelect,
  options,
  searcheble,
  disabled,
  selectRef,
  id,
  label,
  placeholder,
}) => {
  return (
    <div className='w-[100%]'>
      <label
        htmlFor='select'
        className={
          'text-[0.875rem] font-light text-blue-700 leading-[1rem] text-[1rem]'
        }
      >
        {label}
      </label>
      <Select
        onChange={onSelect}
        styles={CustomStyle}
        isSearchable={searcheble}
        defaultValue={''}
        options={options}
        isDisabled={disabled}
        ref={selectRef}
        id={id}
        placeholder={placeholder}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: DropdownIcon,
        }}
      />
    </div>
  );
};

export default SelectInput;
