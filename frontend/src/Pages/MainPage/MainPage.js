import React, { useState } from 'react';
import Thead from '../../Components/Table/Thead';

function MainPage() {
  const headers = [
    {
      title: '№',
      filter: '',
    },
    {
      title: 'Nomi',
      filter: 'name',
    },
    {
      title: 'Kodi',
      filter: 'code',
    },
    {
      title: 'Soni',
      filter: 'total',
    },
  ];

  const [sortItem, setSortItem] = useState({
    filter: '',
    sort: '',
  });

  return (
    <div>
      <Thead
        headers={headers}
        Sort={(filter) =>
          setSortItem({
            filter: filter,
            sort: '0',
          })
        }
        sortItem={sortItem}
      />
    </div>
  );
}
export default MainPage;
