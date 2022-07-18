import React, { useState } from 'react';
import Table from '../../Components/Table/Table';

export const MainPage = () => {
  const headers = [
    {
      title: '№',
      filter: false,
    },
    {
      title: 'Mahsulot kodi',
      filter: 'code',
      styles: '',
    },
    {
      title: 'Mahsulot nomi',
      filter: 'name',
      styles: 'text-left',
    },
    {
      title: 'Soni (dona)',
      filter: 'total',
      styles: '',
    },
    {
      title: 'Kelgan narx',
      filter: 'incomingprice',
      styles: '',
    },
    {
      title: 'Sotish narx',
      filter: 'sellingprice',
      styles: '',
    },
    {
      title: '',
      filter: false,
      styles: '',
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
