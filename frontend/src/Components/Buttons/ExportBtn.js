import React from 'react';
import Excel from '../../Images/Excel.svg';
import {CSVLink} from 'react-csv';

function ExportBtn({data, headers, fileName}) {
    return (
        <button>
            <CSVLink
                data={data}
                headers={headers}
                filename={fileName}
                className='exportButton'
            >
                Eksport
                <span className={'btn-icon bg-white-900 p-[8px]'}>
          <img src={Excel} alt='excel icon'/>
        </span>
            </CSVLink>
        </button>
    );
}

export default ExportBtn;
