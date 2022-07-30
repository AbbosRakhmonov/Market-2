import React from 'react'
import {RouteLink} from '../../Components/RouteLinks/RouteLink'
import {Outlet} from 'react-router-dom'
const Sale = () => {
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
           

            <div className=''>
                <Outlet />
            </div>

        </section>
    )
}

export default Sale
