import React from 'react';
import { components } from 'react-select';
import { IoCaretDown } from 'react-icons/io5';

export const DropdownIcon = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <IoCaretDown size={'0.625rem'} color={'#86A7E9'} />
    </components.DropdownIndicator>
  );
};
const Container = (styles) => ({
  ...styles,
});
const DropdownIndicator = (styles, { isFocused }) => ({
  ...styles,
  padding: 0,
  color: isFocused ? '#193F8A' : '#071F45',
});
const IndicatorsContainer = (styles) => ({
  ...styles,
  marginLeft: '5px',
});
const Menu = (styles) => ({
  ...styles,
  overflow: 'hidden',
});
const Option = (styles, { isFocused, isSelected }) => ({
  ...styles,
  fontSize: '.875rem',
  fontWeight: '400',
  color: isSelected || isFocused ? '#ffffff' : '#071F45',
  backgroundColor: isSelected ? '#0090A3' : isFocused ? '#00B4CC' : '#ffffff',
  transition: 'all 0.2s ease',
  overflow: 'hidden',
  cursor: 'pointer',
});
const SingleValue = (styles) => ({
  ...styles,
  color: '#86A7E9',
  fontSize: '.875rem',
  fontWeight: '400',
  margin: 0,
});
const ValueContainer = (styles) => ({
  ...styles,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Placeholder = (styles) => ({
  ...styles,
  color: '#86A7E9',
});
const Control = (styles) => ({
  ...styles,
  marginTop: '.625rem',
  borderRadius: '.25rem',
  fontSize: '.875rem',
  fontWeight: '400',
  padding: '.5rem',
  color: '#86A7E9',
  outline: 'none',
  border: '1px solid #86A7E9',
  boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#EAEAEA',
  },
});

const CustomStyle = {
  control: Control,
  container: Container,
  option: Option,
  menu: Menu,
  singleValue: SingleValue,
  valueContainer: ValueContainer,
  indicatorsContainer: IndicatorsContainer,
  dropdownIndicator: DropdownIndicator,
  placeholder: Placeholder,
};

export default CustomStyle;
