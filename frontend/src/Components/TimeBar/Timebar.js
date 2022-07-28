import {useState} from 'react'

function Timebar() {
    const [hour, setHour] = useState(
        new Date().toLocaleTimeString('uz-UZ', {hour12: false})
    )
    const weekDays = [
        'Yakshanba',
        'Dushanba',
        'Seshanba',
        'Chorshanba',
        'Payshanba',
        'Juma',
        'Shanba',
    ]
    const monthNames = [
        'Yanvar',
        'Fevral',
        'Mart',
        'Aprel',
        'May',
        'Iyun',
        'Iyul',
        'Avgust',
        'Sentabr',
        'Oktabr',
        'Noyabr',
        'Dekabr',
    ]
    setTimeout(() => {
        setHour(new Date().toLocaleTimeString('uz-UZ', {hour12: false}))
    }, 1000)
    return (
        <div
            className={
                'w-[60%] px-[2.5rem] py-[1.875rem] bg-loginButton rounded-[1.875rem] text-center text-white-900 flex flex-col gap-[1.25rem] shadow-[-23px_28px_15px_rgba(0,0,0,0.06)] absolute left-[79.5373665480427%] top-[6.761565836298932%] z-20'
            }
        >
            <h5 className={'font-bold text-[1.25rem] leading-[1.4375rem]'}>
                {weekDays[new Date().getDay()]}, {new Date().getDate()}{' '}
                {monthNames[new Date().getMonth()]}, {new Date().getFullYear()}{' '}
                yil
            </h5>
            <span
                className={'time-line block border-[1px] border-b-white-900'}
            ></span>
            <h3 className={'leading-[1.75rem] font-bold text-[1.5rem]'}>
                {hour.replaceAll(':', ' : ')}
            </h3>
        </div>
    )
}

export default Timebar