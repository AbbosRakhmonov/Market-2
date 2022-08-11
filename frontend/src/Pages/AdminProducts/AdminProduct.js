import React from 'react'
import SearchForm from '../../Components/SearchForm/SearchForm';
import Table from '../../Components/Table/Table';
import BtnAddRemove from './../../Components/Buttons/BtnAddRemove';
import Pagination from './../../Components/Pagination/Pagination';
import Microsoft from '../../Images/Microsoft.svg';
import EPA from '../../Images/EPA.svg'

const AdminProduct = () => {

    const data = [
        {
            _id: 1,
            logo: <div className='pt-[3px] w-[3rem] h-[3rem]'><img src={Microsoft} className={"w-[3.5rem] h-[3.5rem]"}></img></div>,
            shopName: "Microsoft",
            director: "Dilso`z Jonizoqova",
            phone: "+9989 94 374 30 07",
            type: <div className='w-[24px] h-[24px] bg-[#12B76A] rounded-[50%] ml-[4px]'></div>,
        },
        {
            _id: 2,
            logo: <div className='pt-[3px] w-[3rem] h-[3rem]'><img src={EPA} className={"w-[3.5rem] h-[3.5rem]"}></img></div>,
            shopName: "EPA",
            director: "Sayyor",
            phone: "+9989 94 374 30 07",
            type: <div className='w-[24px] h-[24px] bg-[#F79009] rounded-[50%] ml-[4px]'></div>,
        }
    ]

    const headers = [
        { title: "№", styles: "text-left w-[8%]" },
        { title: "Logotip", styles: "w-[6%]" },
        { title: "Do`kon nomi", styles: "text-center w-[28%]" },
        { title: "Director", styles: "text-center w-[28%]" },
        { title: "Telefon", styles: "text-center w-[17%]" },
        { title: "Turi", styles: "text-center w-[5%]" },
        { title: "", styles: "w-[8%]" }

    ]

    return (
        <section>
            <div className='mainPadding'>
                <BtnAddRemove text={"Yangi do`kon qo`shish"} add={true} />
            </div>
            <div className='admin-product'>
                <p>Do`konlar</p>
                <Pagination totalDatas={24} countPage={2} />
            </div>
            <SearchForm filterBy={["total", "name", "name"]} />
            <div className={"tableContainerPadding"}>
                <Table
                    page={"adminProduct"}
                    data={data}
                    headers={headers}
                    currentPage={0}
                    countPage={10}
                />
            </div>
        </section>
    )
}

export default AdminProduct