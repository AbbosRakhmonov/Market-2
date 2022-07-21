import React from 'react';
import Table from '../../Components/Table/Table';

function MainPage(props) {
  const headers = [
    {
      title: '№',
      filter: '',
    },
    {
      title: 'Kategoriya kodi',
      filter: 'code',
    },
    {
      title: 'Kategoriya nomi',
      filter: 'name',
    },
    {
      title: '',
      filter: '',
    },
  ];

  const data = [
    {
      _id: 1,
      name: 'Truba',
      code: '001001',
    },
    {
      _id: 2,
      name: 'Truba',
      code: '001001',
    },
    {
      _id: 3,
      name: 'Truba',
      code: '001001',
    },
  ];

  return (
    <div>
      <Table
        page={'category'}
        headers={headers}
        data={data}
        currentPage={0}
        countPage={10}
      />
    </div>
  );
}

export default MainPage;
