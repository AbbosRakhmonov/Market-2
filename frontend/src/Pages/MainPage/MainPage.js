import React, { useState } from 'react';
import Table from '../../Components/Table/Table';

export const MainPage = () => {
  const headers = [
    {
      colSpan: 1,
      title: '№',
      filter: false,
    },
    {
      colSpan: 1,
      title: 'Mahsulot kodi',
      filter: 'code',
    },
    {
      colSpan: 4,
      title: 'Mahsulot nomi',
      filter: false,
    },
    {
      colSpan: 1,
      title: 'Soni (dona)',
      filter: 'total',
    },
    {
      colSpan: 2,
      title: 'Kelgan narx',
      filter: 'incomingprice',
    },
    {
      colSpan: 2,
      title: 'Sotish narx',
      filter: 'sellingprice',
    },
    {
      colSpan: 1,
      title: '',
      filter: false,
    },
  ];

  const data = [
    {
      productdata: {
        code: '001001',
        name: 'truba',
      },
      unit: {
        name: 'dona',
      },
      price: {
        incomingprice: 2000,
        sellingprice: 4000,
      },
      total: 20,
    },
    {
      productdata: {
        code: '001001',
        name: 'truba',
      },
      unit: {
        name: 'dona',
      },
      price: {
        incomingprice: 2000,
        sellingprice: 4000,
      },
      total: 20,
    },
    {
      productdata: {
        code: '001001',
        name: 'truba',
      },
      unit: {
        name: 'dona',
      },
      price: {
        incomingprice: 2000,
        sellingprice: 4000,
      },
      total: 20,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [countPage, setCountPage] = useState(10);

  return (
    <div className='p-4'>
      <Table
        page={'product'}
        headers={headers}
        data={data}
        currentPage={currentPage}
        countPage={countPage}
      />
    </div>
  );
};
