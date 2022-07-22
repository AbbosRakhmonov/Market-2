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
      filter: 'name',
    },
    {
      title: 'Nomi',
      filter: 'code',
    },
    {
      title: 'Dastlabki',
      filter: '',
    },
    {
      title: 'Sanoq',
      filter: '',
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
    },
  ];

  const data = [
    {
      productdata: {
        name: 'Truba',
        code: '002002',
      },
      unit: {
        name: 'dona',
      },
      total: 100,
      difference: 99,
    },
    {
      productdata: {
        name: 'Truba',
        code: '002002',
      },
      unit: {
        name: 'dona',
      },
      total: 100,
      difference: 99,
    },
    {
      productdata: {
        name: 'Truba',
        code: '002002',
      },
      unit: {
        name: 'dona',
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
        currency={'USD'}
      />
    </div>
  );
}

export default MainPage;
