import React from 'react';
import Table from '../../Components/Table/Table';

function MainPage(props) {
  const headers = [
    {
      title: '№',
      filter: '',
    },
    {
      title: 'Kodi',
      filter: 'code',
    },
    {
      title: 'Nomi',
      filter: 'name',
      styles: 'w-[30%]',
    },
    {
      title: 'Dastlabki',
      filter: 'name',
    },
    {
      title: 'Sanoq',
      filter: '',
      styles: 'w-[10%]',
    },
    {
      title: 'Farq',
      filter: '',
    },
    {
      title: 'Izoh',
      filter: '',
    },
    {
      title: '',
      filter: '',
    },
  ];

  const data = [
    {
      _id: 1,
      productdata: {
        name: 'Truba',
        code: '001001',
      },
      unit: {
        name: 'metr',
      },
      total: 100,
      difference: 99,
    },
    {
      _id: 2,
      productdata: {
        name: 'Truba',
        code: '001001',
      },
      unit: {
        name: 'metr',
      },
      total: 100,
      difference: 99,
    },
    {
      _id: 3,
      productdata: {
        name: 'Truba',
        code: '001001',
      },
      unit: {
        name: 'metr',
      },
      total: 100,
      difference: 99,
    },
  ];

  return (
    <div>
      <Table
        page={'inventory'}
        headers={headers}
        data={data}
        currentPage={0}
        countPage={10}
      />
    </div>
  );
}

export default MainPage;
