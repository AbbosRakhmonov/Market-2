import React from 'react'
import Table from '../../Components/Table/Table'
import Pagination from '../../Components/Pagination/Pagination'

function Inventories() {
    const data = [
        {
            createdAt: '28.07.2022',
            id: 1,
            product: {name: 'Militina'},
            status: true,
        },
        {
            createdAt: '26.05.2022',
            id: 2,
            product: {name: 'Militina2'},
            status: false,
        },
        {
            createdAt: '18.06.2022',
            id: 3,
            product: {name: 'Militina3'},
            status: true,
        },
    ]

    const headers = [
        {styles: 'w-[10%] text-start', filter: '', title: '№'},
        {styles: 'w-[10%] text-start', filter: 'code', title: 'Sana'},
        {styles: 'w-[10%] text-start', filter: '', title: 'ID'},
        {styles: 'text-start', filter: '', title: 'Maxsulotlar'},
        {styles: 'w-[10%]', filter: '', title: 'Holati'},
        {styles: 'w-[10%]', filter: '', title: ' '},
    ]

    return (
        <section>
            <div className='inventoriesHead mainPadding'>
                <div className='font-[400] text-[1.25rem] text-blue-900'>
                    Invertarizatsiyalar
                </div>
                <div>
                    <Pagination
                        countPage={6}
                        totalDatas={72}
                        setCurrentPage={``}
                        currentPage={``}
                    />
                </div>
            </div>
            <div className='tableContainerPadding'>
                <Table
                    page='inventories'
                    currentPage={3}
                    countPage={3}
                    data={data}
                    headers={headers}
                />
            </div>
        </section>
    )
}

export default Inventories