import React from 'react';
import Table from '../../Components/Table/Table';

function MainPage() {
  const data = [
    {
      id: '00334',
      createdAt: new Date(),
      client: {
        name: 'navruz',
      },
      debts: [
        {
          debt: 2666.6667,
          debtuzs: 400000,
        },
      ],
      discounts: [
        {
          discount: 33000,
          discountuzs: 66000,
        },
        {
          discount: 33000,
          discountuzs: 66000,
        },
      ],
      payments: [
        {
          payment: 3333.3333,
          paymentuzs: 500000,
        },
        {
          payment: 3333.3333,
          paymentuzs: 500000,
        },
      ],
      products: [
        {
          createdAt: '2022-07-27T05:39:07.766Z',
          pieces: 200,
          saleproducts: [],
          totalprice: 2000,
          totalpriceuzs: 300000,
          unitprice: 2000,
          unitpriceuzs: 300000,
        },
        {
          createdAt: '2022-07-27T05:39:07.766Z',
          pieces: 200,
          saleproducts: [],
          totalprice: 2000,
          totalpriceuzs: 300000,
          unitprice: 2000,
          unitpriceuzs: 300000,
        },
      ],
    },
    {
      id: '00334',
      createdAt: new Date(),
      debts: [
        {
          debt: 2666.6667,
          debtuzs: 400000,
        },
      ],
      discounts: [
        {
          discount: 33000,
          discountuzs: 66000,
        },
      ],
      payments: [
        {
          payment: 3333.3333,
          paymentuzs: 500000,
        },
      ],
      products: [
        {
          createdAt: '2022-07-27T05:39:07.766Z',
          pieces: 200,
          saleproducts: [],
          totalprice: -2000,
          totalpriceuzs: -300000,
          unitprice: 2000,
          unitpriceuzs: 300000,
        },
      ],
    },
  ];

  const headers = [
    {
      title: '№',
    },
    {
      title: 'ID',
      filter: 'id',
      styles: '',
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
      filter: 'discount',
    },
    {
      title: 'Qarz',
      filter: 'debt',
    },
    {
      title: 'Izoh',
    },
    {
      title: '',
    },
  ];

  return (
    <div className='p-8'>
      <Table
        headers={headers}
        data={data}
        currency={'USD'}
        currentPage={0}
        countPage={10}
        page={'saleslist'}
      />
    </div>
  );
}
export default MainPage;
