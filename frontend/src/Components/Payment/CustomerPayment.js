import {IoPerson} from 'react-icons/io5'
import {
    DiscountBtn,
    Payment,
    SaleBtn
} from '../Buttons/SaleBtns.js'
import {DiscountInput} from '../Inputs/DiscountInputs.js'
import {useSelector} from 'react-redux'
import PaymentInput from './PaymentInput/PaymentInput.js'

function CustomerPayment(
    {
        active,
        togglePaymentModal,
        type = 'cash',
        cash = '',
        card = '',
        transfer = '',
        discount,
        hasDiscount,
        debt,
        allPayment,
        paid = 0,
        client = '',
        onChange,
        onClose,
        changePaymentType,
        discountSelectOption,
        handleClickDiscountBtn,
        handleChangeDiscountSelectOption,
        handleChangeDiscount,
        handleClickPay
    }) {
    const defineLabel = () => {
        switch (type) {
            case 'card':
                return <PaymentInput
                    value={card}
                    key={'sale-card'}
                    keyInput={type}
                    onChange={onChange}
                    onClose={onClose}
                    label={'Plastik'} />
            case 'transfer':
                return <PaymentInput
                    value={transfer}
                    key={'sale-transfer'}
                    keyInput={type}
                    onChange={onChange}
                    onClose={onClose}
                    label={'O\'tkazma'} />
            case 'mixed':
                return [
                    {label: 'Naqd', key: 'cash', value: cash},
                    {label: 'Plastik', key: 'card', value: card},
                    {
                        label: 'O\'tkazma',
                        key: 'transfer',
                        value: transfer
                    }].map(obj => <PaymentInput
                    value={obj.value}
                    key={`sale-${obj.key}`}
                    keyInput={obj.key}
                    onChange={onChange}
                    onClose={onClose}
                    label={obj.label}
                />)
            default:
                return <PaymentInput
                    key={'sale-cash'}
                    value={cash}
                    onChange={onChange}
                    keyInput={type}
                    onClose={onClose}
                    label={'Naqd'} />
        }
    }
    const {currencyType} = useSelector(state => state.currency)
    return (
        <section
            className={`absolute transition-all left-0 top-0 right-0 bottom-0 overflow-hidden duration-200 ease-out bg-black-300 backdrop-blur-[3px] z-20 ${active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={togglePaymentModal}>
            <h3 className={'text-white-900 text-lg leading-[1.875rem absolute top-[50%] left-[35%] -translate-x-[50%]'}>Oynani
                yopish uchun bu yerga bosing !</h3>
            <div
                className={`customerPay-head-style transition-all duration-200 ease-linear h-full overflow-auto absolute top-0 bottom-0 right-0 ${active ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()} autoFocus>
                <div className='top-payment w-full'>
                    {client && <div className='customer-head-icon'>
                        <div className='flex items-center custom-payment-text-style'>
                            <IoPerson className='mr-[0.75rem]' />
                            <span>Mijoz : </span>
                        </div>
                        <h3 className='text-[0.875rem]'>{client}</h3>
                    </div>}
                    <div
                        className='mb-[1.25rem] font-medium text-[1.25rem] text-center leading-[23.44px]'>{allPayment.toLocaleString('ru-Ru')} {currencyType}</div>
                    <ul className='w-full pb-[1.25rem]'>
                        {defineLabel()}
                        {hasDiscount &&
                            <DiscountInput value={discount} onChange={handleChangeDiscount}
                                           option={discountSelectOption}
                                           onSelect={handleChangeDiscountSelectOption} />}
                        <li className='custom-payment-ul-li'>
                    <span className='custom-payment-text-style'>
                        Qarzlar :{' '}
                    </span>
                            <h3 className='text-error-500 text-[1rem]'>{debt.toLocaleString('ru-Ru')} {currencyType}</h3>
                        </li>
                        <li className='custom-payment-ul-li'>
                    <span className='custom-payment-text-style'>
                        To'lanayotgan :{' '}
                    </span>
                            <h3 className='text-[1rem] text-loginButton'>{paid.toLocaleString('ru-Ru')} {currencyType}</h3>
                        </li>
                    </ul>
                </div>
                <div
                    className='bottom-payment w-full flex flex-col gap-[1.25rem] border-t-[1px] border-black-200 pt-[1.25rem]'>
                    <div className='custom-paymet-btn'>
                        <SaleBtn text={`Naqd`} type='cash' active={type === 'cash'} onClick={changePaymentType} />
                        <SaleBtn text={`Plastik`} type='card' active={type === 'card'} onClick={changePaymentType} />
                        <SaleBtn text={`O'tkazma`} type='transfer' active={type === 'transfer'}
                                 onClick={changePaymentType} />
                        <SaleBtn text={`Aralash`} type='mixed' active={type === 'mixed'} onClick={changePaymentType} />
                    </div>
                    <DiscountBtn text={`Chegirma`} onClick={handleClickDiscountBtn} />
                    <Payment text={`To'lash`} onClick={handleClickPay} />
                </div>
            </div>
        </section>
    )
}

export default CustomerPayment
