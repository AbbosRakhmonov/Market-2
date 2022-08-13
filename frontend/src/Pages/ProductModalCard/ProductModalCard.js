import React from 'react'
import SearchForm from './../../Components/SearchForm/SearchForm'
import BtnAddRemove from './../../Components/Buttons/BtnAddRemove'
import AdminProductCard from '../../Components/AdminProductCard/AdminProductCard'
import Microsoft from '../../Images/Microsoft.svg'

const ProductModalCard = () => {
    return (
        <section>
            <div className='flex items-center'>
                <div className='flex-[0_0_76%]'>
                    <SearchForm filterBy={['total', 'name', 'name']} />
                </div>
                <div className='flex-[0_0_20%]'>
                    <BtnAddRemove edit={true} text={'Saqlash'} className={'w-[291px]'} />
                </div>
            </div>
            <div className='mainPadding flex gap-[1.25rem] flex-wrap'>
                <AdminProductCard image={Microsoft} company='Microsoft' name='Dilso`z Jonizoqova'
                                  phone={'+998 94 374 30'} />
                <AdminProductCard image={Microsoft} company='Microsoft' name='Dilso`z Jonizoqova'
                                  phone={'+998 94 374 30'} />
                <AdminProductCard image={Microsoft} company='Microsoft' name='Dilso`z Jonizoqova'
                                  phone={'+998 94 374 30'} />
                <AdminProductCard image={Microsoft} company='Microsoft' name='Dilso`z Jonizoqova'
                                  phone={'+998 94 374 30'} />
                <AdminProductCard image={Microsoft} company='Microsoft' name='Dilso`z Jonizoqova'
                                  phone={'+998 94 374 30'} />
                <AdminProductCard image={Microsoft} company='Microsoft' name='Dilso`z Jonizoqova'
                                  phone={'+998 94 374 30'} />
            </div>
        </section>
    )
}

export default ProductModalCard