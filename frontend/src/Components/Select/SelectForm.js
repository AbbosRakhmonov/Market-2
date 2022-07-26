import React from 'react';
import Select from 'react-select';
import CustomStyle from "./CustomStyle";
import {DropdownIcon} from "./CustomStyle";

const SelectForm = ({onSelect}) => {
    const options = [
        {value: 10, label: 10},
        {value: 20, label: 20},
        {value: 50, label: 50},
        {value: 100, label: 100},
    ];
    return (
        <div className='flex items-center justify-center'>
            <label
                htmlFor='select'
                className={'text-[0.875rem] font-light text-blue-700 leading-[1rem]'}
            >
                Ko'rsatish:
            </label>
            <Select
                onChange={onSelect}
                styles={CustomStyle}
                isSearchable={false}
                defaultValue={options[0]}
                options={options}
                id={'select'}
                components={{IndicatorSeparator: () => null, DropdownIndicator: DropdownIcon}}
            />
        </div>
    );
};

export default SelectForm;
