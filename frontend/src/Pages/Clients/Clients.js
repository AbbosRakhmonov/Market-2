import React from 'react'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Button from '../../Components/Buttons/BtnAddRemove'
import Pagination from '../../Components/Pagination/Pagination'
import Table from '../../Components/Table/Table'

const ClientsPage = () => {
    const data = [
        {
            _id: 1,
            name: 'Navro`z',
            packman: {
                name: 'Dilso`z'
            }
        },
        {
            _id: 2,
            name: 'Abbos',
            packman: {
                name: 'Navro`z'
            }
        },
      
    ]
    const headers = [
        {title: '№', styles:'w-[8%] text-left'},
        {title: 'Yetkazuvchi', styles: 'w-[41%] text-left'},
        {title: 'Mijoz', styles:'w-[41%] text-left'},
        {title: '',styles:'w-[8%] text-left'},
    ]

    return (
        <section>
            <form
                className={"flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200"}
            >
                <div className='supplier-style'>
                <FieldContainer
                    value={''}
                    onChange={() => {}}
                    label={'Yetkazuvchini tanlang'}
                    placeholder={'misol: Dilso`z'}
                    select={true}
                    options={[]}
                    maxWidth={'w-[21rem]'}
                    border={true}
                />

                    <FieldContainer
                        label={'Mijoz ismi'}
                        placeholder={'misol: Navro`z'}
                        maxWidth={'w-[21rem]'}
                        type={'string'}
                    />
                    <div className={'flex gap-[1.25rem] grow w-[18.3125rem]'}>
                        <Button
                            onClick={() => {}}
                            add={true}
                            edit={false}
                            text={'Yangi mijoz qo`shish'}
                        />
                        <Button onClick={() => {}} text={'Tozalash'} />
                    </div>
                </div>
            </form>

            <div className='pagination-supplier mainPadding'>
                <p className='supplier-title'>Inventarizatsiya</p>
                <Pagination countPage={5} totalDatas={60} />
            </div>

            <div className='tableContainerPadding'>
                <Table
                    data={data}
                    page={'client'}
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

export default ClientsPage