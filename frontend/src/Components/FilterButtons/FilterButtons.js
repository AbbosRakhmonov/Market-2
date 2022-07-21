import React from 'react';

function FilterButtons({label, element}) {
    return (
        <div className={'flex items-center gap-[0.75rem]'}>
            {label && <h3 className={'font-light text-blue-700 leading-[1rem] text-sm'}>{label}:</h3>}
            {element}
        </div>
    );
}

export default FilterButtons;