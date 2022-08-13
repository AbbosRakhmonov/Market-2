import React from 'react'
import {IoPerson, IoPhonePortrait} from 'react-icons/io5'
import CheckboxCard from '../CheckboxCard/CheckboxCard'

const AdminProductCard = ({image, company, name, phone}) => {
    return (
        <div className='admin-card'>
            <div className='admin-card-header'>
                <img src={image}></img>
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