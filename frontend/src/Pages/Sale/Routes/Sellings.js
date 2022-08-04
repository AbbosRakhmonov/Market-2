import React from 'react'
import ExportBtn from '../../../Components/Buttons/ExportBtn.js'
import Pagination from '../../../Components/Pagination/Pagination.js'
import Table from '../../../Components/Table/Table.js'
import {motion } from "framer-motion"

const Sellings = () => {
    const headers = [
        {
            title: '№',
        },
        {
            title: 'ID',
            filter: 'id',
        },
        {
            title: 'Mijoz',
            filter: 'client name',
        },
        {
            title: 'Jami',
            filter: 'totalprice',
        },
        {
            title: 'Chegirma',
            filter: 'discount discount',
        },
        {
            title: 'Qarz',
            filter: 'debt debt',
        },
        {
            title: 'Izoh',
        },
        {
            title: '',
        },
    ]
    const data = [
        {
            _id: 1,
            id: 1000001,
            client: {name: 'Valisher'},
            products: [{totalprice: 10, totalpriceuzs: 110000}],
            discounts: [{discount: 10, discountuzs: 110000}],
            payments: [
                {payment: 10, paymentuzs: 110000, comment: "Qarz bo'ldi"},
            ],
        },
    ]
    return (
        <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
            <div className='pagination mainPadding'>
                <ExportBtn
                    data={[]}
                    fileName={`Sotuvlar-${new Date().toLocaleDateString()}`}
                />
                <p className='flex items-center'>Sotuvlar</p>
                <Pagination
                    countPage={10}
                    currentPage={2}
                    totalDatas={100}
                    setCurrentPage={() => {}}
                />
            </div>
            <div className='mainPadding'>
                <Table
                    data={data}
                    currentPage={2}
                    currency={'UZS'}
                    countPage={10}
                    page={'saleslist'}
                    headers={headers}
                />
            </div>
        </motion.section>
    )
}

export default Sellings
