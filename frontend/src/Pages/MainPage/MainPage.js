import React from 'react';
import {
  DiscountBtn,
  Payment,
  PaymentClip,
  SaleBtn,
} from '../../Components/Buttons/SaleBtns';

function MainPage(props) {
  return (
    <>
      <div className='grid grid-cols-2 gap-2 w-[290px]'>
        <>
          <SaleBtn text={'Naqd'} type={"cash"} />
          <SaleBtn text={'Plastik'} type={"card"}/>
        </>
        <>
          <SaleBtn text={"O'tkazma"} type={"transfer"} />
          <SaleBtn text={'Aralash'} type={"mixed"}/>
        </>

        <DiscountBtn text={'Chegirma'} />
      </div>
      <div className='flex justify-between w-[290px]'>
        <Payment text={"To'lash"} />
        <PaymentClip/>
      </div>
    </>
  );
}

export default MainPage;
