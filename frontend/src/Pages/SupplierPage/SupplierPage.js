import React from 'react'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Button from '../../Components/Buttons/BtnAddRemove'
import Pagination from '../../Components/Pagination/Pagination'
import Table from '../../Components/Table/Table'

const Supplier = () => {
    const data = [
        {
            _id: 1,
            name: 'Dilso`z',
        },
        {
            _id: 2,
            name: 'Navro`z',
        },
        {
            _id: 3,
            name: 'Abbos',
        }
    ]
    const headers = [
        {title: '№', styles:'w-[8%] text-left'},
        {title: 'Yetkazuvchi', styles: 'w-[84%] text-left'},
        {title: '',styles:'w-[8%] text-left'},
    ]

    return (
        <section>
            <form
                className={`flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200`}
            >
                <div className='supplier-style'>
                    <FieldContainer
                        label={'Yetkazuvchi ismi'}
                        placeholder={'misol: Dilso`z'}
                        maxWidth={'w-[41rem]'}
                        type={'string'}
                    />
                    <div className={'flex gap-[1.25rem] grow w-[20.8125rem]'}>
                        <Button
                            onClick={() => {}}
                            add={true}
                            edit={false}
                            text={'Yangi yetkazuvchi qo`shish'}
                        />
                        <Button onClick={() => {}} text={'Tozalash'} />
                    </div>
                </div>
            </form>

            <div className='pagination-supplier mainPadding'>
                <p className='supplier-title'>Yetkazuvchilar</p>
                <Pagination countPage={5} totalDatas={60} />
            </div>

            <div className='tableContainerPadding'>
                <Table
                    data={data}
                    page={'supplier'}
                    currentPage={0}
                    countPage={10}
                    headers={headers}
                    Edit={() => {}}
                    Delete={() => {}}
                />
            </div>
        </section>
    )
}

export default Supplier
