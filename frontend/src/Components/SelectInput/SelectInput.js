import React from 'react'
import Select from 'react-select'
import CustomStyle, {DropdownIcon} from './CustomStyle'

const SelectInput = ({
    onSelect,
    options,
    disabled,
    label,
    placeholder,
    value,
}) => {
    return (
        <div>
            <label className={'text-blue-700 leading-[1.125rem] mb-[.625rem]'}>
                {label}
            </label>
            <Select
                onChange={onSelect}
                styles={CustomStyle}
                value={value}
                defaultValue={''}
                options={options}
                isDisabled={disabled}
                placeholder={placeholder}
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: DropdownIcon,
                }}
            />
        </div>
    )
}

export default SelectInput
