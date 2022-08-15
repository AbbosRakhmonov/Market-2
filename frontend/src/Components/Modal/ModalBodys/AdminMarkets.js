import React, {useEffect, useState} from 'react'
import SearchForm from '../../SearchForm/SearchForm.js'
import {clearSearchedBranches, getBranchesByFilter} from '../../../Pages/AdminProducts/adminproductsSlice.js'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../../Spinner/SmallLoader.js'
import NotFind from '../../NotFind/NotFind.js'
import BtnAddRemove from '../../Buttons/BtnAddRemove.js'
import Pagination from '../../Pagination/Pagination.js'
import AdminProductCard from '../../AdminProductCard/AdminProductCard.js'

function AdminMarkets({product}) {
    const dispatch = useDispatch()
    const {
        markets,
        total,
        searchedBranches,
        totalSearchedBranches,
        loadingGetBranches
    } = useSelector(state => state.adminmarkets)
    const [name, setName] = useState('')
    const [data, setData] = useState([])
    const [director, setDirector] = useState('')
    const [showByTotal, setShowByTotal] = useState('10')
    const [currentPage, setCurrentPage] = useState(0)
    const [searchedData, setSearchedData] = useState(searchedBranches)
    const [filteredDataTotal, setFilteredDataTotal] = useState(total - 1)

    const filterByTotal = ({value}) => {
        setShowByTotal(value)
        setCurrentPage(0)
    }
    const filterByMarketName = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setName(val)
        ;(searchedData.length > 0 || totalSearchedBranches > 0) &&
        dispatch(clearSearchedBranches())
        if (valForSearch === '') {
            setData([...markets.filter(item => item._id !== product?._id)])
            setFilteredDataTotal(total - 1)
        } else {
            const filteredProducts = markets.filter((market) => {
                return market.name
                    .toLowerCase()
                    .includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const filterByDirectorName = (e) => {
        let val = e.target.value
        let valForSearch = val.toLowerCase().replace(/\s+/g, ' ').trim()
        setDirector(val)
        ;(searchedData.length > 0 || totalSearchedBranches > 0) &&
        dispatch(clearSearchedBranches())
        if (valForSearch === '') {
            setData([...markets.filter(item => item._id !== product?._id)])
            setFilteredDataTotal(total - 1)
        } else {
            const filteredProducts = markets.filter((market) => {
                return market.director.firstname
                    .toLowerCase()
                    .includes(valForSearch) || market.director.lastname.toLowerCase().includes(valForSearch)
            })
            setData(filteredProducts)
            setFilteredDataTotal(filteredProducts.length)
        }
    }
    const filterByMarketNameAndDirectorNameWhenPressEnter = (e) => {
        if (e.key === 'Enter') {
            setCurrentPage(0)
            const body = {
                currentPage: 0,
                countPage: showByTotal,
                marketId: product?._id,
                search: {
                    name: name.replace(/\s+/g, ' ').trim(),
                    director: director.replace(/\s+/g, ' ').trim()
                }
            }
            dispatch(getBranchesByFilter(body))
        }
    }
    useEffect(() => {
        setData([...markets.filter(item => item._id !== product?._id)])
    }, [markets])
    useEffect(() => {
        setFilteredDataTotal(total - 1)
    }, [total])
    useEffect(() => {
        setSearchedData(searchedBranches)
    }, [searchedBranches])
    console.log(data)
    return (
        <section className={'mt-4'}>
            <div className={'flex justify-between items-center mainPadding'}>
                <h3 className={'text-blue-900 text-[xl] leading-[1.875rem]'}>
                    Filiallar
                </h3>
                {(filteredDataTotal !== 0 || totalSearchedBranches !== 0) && (
                    <Pagination
                        countPage={Number(showByTotal)}
                        totalDatas={totalSearchedBranches || filteredDataTotal}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
            <div className='flex items-center'>
                <SearchForm
                    filterBy={['total', 'marketName', 'directorName']}
                    filterByMarketName={filterByMarketName}
                    filterByDirectorName={filterByDirectorName}
                    searchByDirectorName={director}
                    searchByMarketName={name}
                    filterByDirectorNameWhenPressEnter={filterByMarketNameAndDirectorNameWhenPressEnter}
                    filterByMarketNameWhenPressEnter={filterByMarketNameAndDirectorNameWhenPressEnter}
                    filterByTotal={filterByTotal}
                />
                <div className='min-w-[18rem]'>
                    <BtnAddRemove edit={true} text={'Saqlash'} />
                </div>
            </div>
            {loadingGetBranches ? (
                <Spinner />
            ) : data.length === 0 && searchedData.length === 0 ? (
                <NotFind text={'Do\'konlar mavjud emas'} />
            ) : <div className={'flex flex-wrap gap-[2rem] pl-[2.5rem] py-[1.25rem]'}>
                {searchedData.length > 0 ? searchedData.map(item =>
                        <AdminProductCard name={item?.director?.firstname}
                                          company={item?.name}
                                          image={item?.image}
                                          phone={item?.phone1}
                                          key={item._id}
                        />) :
                    data.map(item =>
                        <AdminProductCard name={item?.director?.firstname}
                                          company={item?.name}
                                          image={item?.image}
                                          phone={item?.phone1}
                                          key={item._id}
                        />)}
            </div>}
        </section>
    )
}

export default AdminMarkets