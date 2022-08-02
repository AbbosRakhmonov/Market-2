import {IoCloseCircleOutline} from 'react-icons/io5'

function Approve({toggleModal, approveFunction, headerText, title}) {
    return (
        <div className={'modalContent text-center'}>
            <div className='flex items-center justify-center'>
                <IoCloseCircleOutline
                    className={'modalIcon text-error-500'}
                    size={'6rem'}
                />
            </div>
            <p className={'text-[1.125rem] text-black-700 font-medium mt-5'}>
                {headerText}
            </p>
            <p className={'text-black-700 font-light mt-3 text-[0.8rem]'}>
                {title}
            </p>
            <div
                className={'flex mt-7 items-center justify-center gap-[1.5rem]'}
            >
                <button
                    className={'approveBtn bg-black-500 hover:bg-black-700'}
                    onClick={toggleModal}
                >
                    Bekor qilish
                </button>
                <button
                    className={'approveBtn bg-error-500 hover:bg-error-700'}
                    onClick={approveFunction}
                >
                    O'chirish
                </button>
            </div>
        </div>
    )
}

export default Approve
