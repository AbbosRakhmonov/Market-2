import React from 'react'
import { components } from 'react-select'
import { BsChevronRight } from 'react-icons/bs'

export const DropdownIcon = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <BsChevronRight size={"10px"} color={"rgba(28, 28, 28, 0.5)"} />
        </components.DropdownIndicator>
    )
}

const DropdownIndicator = (styles) => ({
    ...styles,
    padding: 0
})

const IndicatorsContainer = (styles) => ({
    ...styles,
    size: "10px",
    marginTop: "-2px",
    marginLeft: "-1.1rem"
})


const Container = (styles) => ({
    ...styles,
    outline: "none",
    border: "none",
})

const Control = (styles) => ({
    ...styles,
    with: '100%',
    padding: ".3125rem .625rem",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    borderRadius: ".5rem",
    backgroundColor: "#EAEAEA",
    height: "30px",
    outline: 'none',
    border: 'none',
    cursor: "pointer",
    '&:hover': {
        backgroundColor: '#D4D4D4',
    },
    transition: 'all 0.2s ease',

})


const SingleValue = (styles) => ({
    ...styles,
    padding: "7px 10px",
    fontSize: '.75rem',
    fontWeight: '300',
    lineHeight: '.875rem',
    color: '#1C1C1C',
    marginLeft: "1.1rem",
    "& > span > div ": {
        display: "none"
    }
})
const ValueContainer = (styles) => ({
    ...styles,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-2px"
})

const Menu = (styles) => ({
    ...styles,
    width: "140px",
    marginLeft: "8rem",
    marginTop: "-3.5rem",
    padding: "0 10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
})

const Option = (styles) => ({
    ...styles,
    width: "120px",
    fontSize: '12px',
    lineHeight: '14px',
    borderRadius: "30px",
    padding: "10px 20px",
    height: "34px",
    margin: "5px 0",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#00B4CC"
    },
})

const CustomStyle = {
    option: Option,
    menu: Menu,
    control: Control,
    container: Container,
    singleValue: SingleValue,
    valueContainer: ValueContainer,
    dropdownIndicator: DropdownIndicator,
    indicatorsContainer: IndicatorsContainer,
}

export default CustomStyle