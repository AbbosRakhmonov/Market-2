import React from 'react';
import { RouteLink } from './Components/RouteLink';
import { Outlet } from 'react-router-dom';

const Incoming = () => {
  return (
    <section>
      <div className='h-[80px] w-full border-b-2 border-black-100 flex justify-around items-center'>
        <RouteLink
          path={'qabulqilish'}
          iconType={'bag'}
          title={'Qabul qilish'}
        />
        <RouteLink path={'qabullar'} iconType={'cloud'} title={'Qabullar'} />
        <RouteLink
          path={'saqlanganlar'}
          iconType={'clip'}
          title={'Saqlanganlar'}
        />
        <RouteLink path={'ruyxat'} iconType={'text'} title={'Ro`yxat'} />
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default Incoming;
