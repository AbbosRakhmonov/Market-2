import React, {useEffect} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import LinkToBack from '../../Components/LinkToBack/LinkToBack.js'
import {useDispatch, useSelector} from 'react-redux'
import {getReportOfCategory} from './CategoryReportSlice.js'
import Table from '../../Components/Table/Table.js'
import Spinner from '../../Components/Spinner/SmallLoader.js'
import NotFind from '../../Components/NotFind/NotFind.js'

function CategoryReport() {
    const headers = [{title: '№'}, {title: 'Kodi'}, {title: 'Nomi'}, {title: 'Soni'}, {title: 'Olish (UZS)'}, {title: 'Olish (USD)'}, {title: 'Sotish (UZS)'}, {title: 'Sotish (USD)'}]
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const {code} = useParams()
    const {products, loading} = useSelector(state => state.categoryReport)
    useEffect(() => {
        if (location.state) {
            dispatch(getReportOfCategory({categoryId: location.state.id}))
        } else {
            navigate(-1)
        }
    }, [dispatch, location.state, navigate])
    return (
        <section>
            <div className={'mainPadding flex items-center justify-between pt-12'}>
                <LinkToBack link={-1} />
                <h2 className={'text-base text-black-700'}><span
                    className={'font-medium text-xl text-blue-400'}>{code} {location?.state?.name && `- ${location?.state?.name}`}</span> -
                    kategoriya
                    bo'yicha hisobot</h2>
            </div>
            <div className={'tableContainerPadding'}>
                {
                    loading ? <Spinner /> : products.length > 0 ? <Table
                        page={'categoryreport'}
                        headers={headers}
                        data={products}
                    /> : <NotFind text={'Maxsulot topilmadi d...'} />
                }
            </div>
        </section>
    )
}

export default CategoryReport