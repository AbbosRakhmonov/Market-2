import React from "react"
import { IoPerson } from "react-icons/io5";
import { ExitBtn } from "../../Components/Buttons/ExitBtn";
import { SaleBtn, DiscountBtn, Payment, PaymentClip } from "../../Components/Buttons/SaleBtns";
import { DiscountInput } from "../../Components/Inputs/DiscountInputs";
import TableInput from "../../Components/Inputs/TableInput";
function CustomerPayment(){
    return(
        <section className="customerPay-head-style h-[42.75rem]">
           <div className="customer-head-icon">
              <div className="flex items-center custom-payment-text-style">
                <IoPerson className="mr-[0.75rem]"/>
                <span>Mijoz : </span>
              </div>
              <h3 className="text-[0.875rem]">Jasurbek Toshev</h3>
           </div>

           <div className="mb-[1.25rem] font-medium text-[1.25rem]">0 UZS</div>

          <ul className="custom-payment-ul">
            <li className="custom-payment-ul-li">
            <span className="custom-payment-text-style">Naqd : </span>
             <div className="flex items-center w-[11.75rem]">
               <div className="mr-[0.625rem]"><TableInput placeholder={`misol: 100 000 000`} /></div>
                <ExitBtn/>
             </div>
            </li>

            <li className="custom-payment-ul-li">
            <span className="custom-payment-text-style">Plastik : </span>
            <div className="flex items-center w-[11.75rem]">
               <div className="mr-[0.625rem]"><TableInput placeholder={`misol: 100 000 000`} /></div>
                <ExitBtn/>
             </div>
            </li>

            <li className="custom-payment-ul-li">
            <span className="custom-payment-text-style">O'tkazma : </span>
            <div className="flex items-center w-[11.75rem]">
               <div className="mr-[0.625rem]"><TableInput placeholder={`misol: 100 000 000`} /></div>
                <ExitBtn/>
             </div>
            </li>

            <li className="mb-[1rem] w-full">
              <DiscountInput/>
            </li>

            <li className="custom-payment-ul-li">
            <span className="custom-payment-text-style">Qarzlar : </span>
              <h3 className="text-error-500 text-[1rem]">0 UZS</h3>
            </li>
            <li className="custom-payment-ul-li">
               <span className="custom-payment-text-style">To'lanayotgan : </span>
               <h3 className="text-[1rem] text-loginButton">100 000 000 000 UZS</h3>
            </li>
          </ul>
          
          <div className="custom-paymet-btn">
            <div className="w-full"> <SaleBtn text={`Naqd`} type="cash"/></div>
            <div className="w-full"><SaleBtn text={`Plastik`} type="card"/></div>
          </div>

          <div className="custom-paymet-btn">
            <div className="w-full"><SaleBtn text={`O'tkazma`} type="transfer"/></div>
            <div className="w-full"><SaleBtn text={`Aralash`} type="mixed"/></div>
          </div>
           
           <div className="w-full mb-[1.25rem]">
            <DiscountBtn text={`Chegirma`} className="w-full"/>
           </div>

           <div className="w-full flex justify-between gap-[0.625rem] items-stretch">
             <div className="w-full"><Payment text={`To'lash`}/></div>
             <div className="w-full"><PaymentClip/></div>
           </div>
        </section>
    )
}

export default CustomerPayment;