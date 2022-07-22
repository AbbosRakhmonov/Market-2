import React from 'react';
import Select from 'react-select';
import CustomStyle from "./CustomStyle";
import {DropdownIcon} from "./CustomStyle";

const SelectInput = ({onSelect}) => {
    const options = [
        {value: 10, label: 10},
        {value: 20, label: 20},
        {value: 50, label: 50},
        {value: 100, label: 100},
    ];
    return (
        <div className='flex items-center w-[100%] inputClass'>
            {/* <label
                htmlFor='select'
                className={'text-[1rem] font-light text-blue-700 leading-[1.125rem] mb-[.625rem]'}
            >
                O'lchov birligi
            </label> */}
            <Select
                onChange={onSelect}
                styles={CustomStyle}
                isSearchable={true}
                defaultValue={options[0]}
                options={options}
                id={'select'}
                components={{IndicatorSeparator: () => null, DropdownIndicator: DropdownIcon}}
            />
        </div>
    );
};

export default SelectInput;
