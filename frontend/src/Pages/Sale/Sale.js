import React from 'react'
import {RouteLink} from '../../Components/RouteLinks/RouteLink'
import Table from '../../Components/Table/Table'

const Sale = () => {
    const data = [
        {
            client: {name: 'Milnitsa', id: 1},
            sales: [{pieces: 12, totalprice: 12}],
            createdAt: new Date(),
        },
        {
            client: {name: 'Milnitsa2', id: 2},
            sales: [{pieces: 14, totalprice: 14}],
            createdAt: new Date(),
        },
    ]

    const headers = [
        {styles: 'w-[10%] text-start', filter: '', title: '№'},
        {styles: 'w-[40%]', filter: 'name', title: 'Mijoz'},
        {styles: 'w-[10%]', filter: '', title: 'Maxsulotlar'},
        {styles: 'w-[10%] text-center', filter: 'code', title: 'Jami'},
        {styles: 'w-[10%] text-center', filter: 'createdAt', title: 'Sana'},
        {styles: 'w-[10%] text-center', filter: 'createdAt', title: 'Vaqti'},
        {styles: 'w-[10%]', filter: '', title: ' '},
    ]

    return (
        <section>
            <div className='h-[80px] w-full border-b-2 border-black-100 flex justify-center gap-[2.5rem] items-center'>
                <RouteLink
                    path={'/sotuv/sotish/sotuv'}
                    iconType={'bag'}
                    title={'Sotuv'}
                />
                <RouteLink
                    path={'/sotuv/sotish/saqlanganlar'}
                    iconType={'clip'}
                    title={'Saqlanganlar'}
                />
                <RouteLink
                    path={'/sotuv/sotish/ruyxat'}
                    iconType={'text'}
                    title={"Ro'yxat"}
                />
            </div>

            <div className='tableContainerPadding'>
                <Table
                    page='temporarysale'
                    currentPage={3}
                    countPage={3}
                    data={data}
                    headers={headers}
                    currency='UZS'
                />
            </div>
        </section>
    )
}

export default Sale
