import React from 'react'
import {IoPerson, IoPhonePortrait} from 'react-icons/io5'
import CheckboxCard from '../CheckboxCard/CheckboxCard'

const AdminProductCard = ({image, company, name, phone}) => {
    return (
        <div className='admin-card flex-[0_0_31.55555555%]'>
            <div className='admin-card-header'>
                <div
                    className={'w-[2.5rem] h-[2.5rem] mb-[0.625rem] bg-white-900 rounded-full border-[2px] border-primary-700 flex items-center justify-center p-[2px] shadow-[0_10px_10px_rgba(0,0,0,0.05)]'}>
                    {image ? <img src={image} alt={company}
                                  className={'rounded-full'} /> : company[0].toUpperCase()}
                </div>
                <div className='admin-header-paragraf'>
                    <p>{company}</p>
                </div>
            </div>
            <div className='admin-users'>
                <div className='admin-users-data'>
                    <p><IoPerson size={'24px'} color={'rgba(255, 255, 255, 0.7'} /></p>
                    <div className='admin-users-name'>
                        <p>{name}</p>
                    </div>
                </div>
                <div className='admin-users-data'>
                    <p><IoPhonePortrait size={'24px'} color={'rgba(255, 255, 255, 0.7'} /></p>
                    <div className='admin-users-name'>
                        <p>{phone}</p>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div className='admin-users-checkbox'>
                <CheckboxCard text={'Aloqa :'} />
                <CheckboxCard text={'Filial :'} />
            </div>
        </div>
    )
}

export default AdminProductCard