import React from 'react';
import { RouteLink } from '../../Components/RouteLinks/RouteLink';
import { Outlet } from 'react-router-dom';

const Incoming = () => {
  return (
    <section>
      <div className='h-[80px] w-full border-b-2 border-black-100 flex justify-around items-center'>
        <RouteLink
          path={'/maxsulotlar/qabul/qabulqilish'}
          iconType={'bag'}
          title={'Qabul qilish'}
        />
        <RouteLink
          path={'/maxsulotlar/qabul/qabullar'}
          iconType={'cloud'}
          title={'Qabullar'}
        />
        <RouteLink
          path={'/maxsulotlar/qabul/saqlanganlar'}
          iconType={'clip'}
          title={'Saqlanganlar'}
        />
        <RouteLink
          path={'/maxsulotlar/qabul/ruyxat'}
          iconType={'text'}
          title={'Ro`yxat'}
        />
      </div>
      <div className='mainPadding'>
        <Outlet />
      </div>
    </section>
  );
};

export default Incoming;
