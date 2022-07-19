import React from 'react';
import Select from 'react-select';

const customStyle = {
  control: (provided) => ({
    ...provided,
    marginLeft: '1rem',
    borderRadius: '.5rem',
    fontSize: '.875rem',
    color: '#071F45',
    outline: 'none',
    border: 'none',
    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.05)',
  }),
};

const options = [
  { value: 10, label: 10 },
  { value: 20, label: 20 },
  { value: 50, label: 50 },
  { value: 100, label: 100 },
];

const SelectForm = ({ onSelect }) => {
  return (
    <div className='paragraf '>
      Ko'rsatish :
      <Select
        onChange={onSelect}
        styles={customStyle}
        isSearchable={false}
        defaultValue={[{ value: '10', label: '10' }]}
        options={options}
      />
    </div>
  );
};

export default SelectForm;
