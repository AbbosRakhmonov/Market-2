import {IoPrint} from 'react-icons/io5'

function PrintBtn({onClick}) {
    return (
        <button className='group print-btn-style' onClick={onClick}>
            <span className='print-text-style'>Chop etish</span>
            <span className='print-icon-style'>
                <IoPrint
                    size={'1.125rem'}
                    className='text-primary-800 text-lg transition-all ease-in-out duration-200 group-hover:text-primary-900'
                />
            </span>
        </button>
    )
}

export default PrintBtn
