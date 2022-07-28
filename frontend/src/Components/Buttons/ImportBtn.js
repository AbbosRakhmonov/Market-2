import React from 'react'
import {IoDownloadOutline} from 'react-icons/io5'

function ImportBtn({readExcel}) {
    const handleChange = (e) => {
        const file = e.target.files[0]
        readExcel(file)
    }
    return (
        <>
            <button>
                <label htmlFor='import-field' className='importButton'>
                    Import
                    <span
                        className={
                            'btn-icon bg-white-900 p-[8px] text-primary-800'
                        }
                    >
                        <IoDownloadOutline size={'1rem'} />
                    </span>
                </label>
            </button>
            <input
                type='file'
                className={'hidden'}
                id={'import-field'}
                onChange={handleChange}
            />
        </>
    )
}

export default ImportBtn