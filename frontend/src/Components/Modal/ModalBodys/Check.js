import React from "react"
import PrintBtn from "../../Buttons/PrintBtn"
import BtnAddRemove from "../../Buttons/BtnAddRemove"
function Check() {
    
    const data = [
        {id: 1, sana : "25.07.2022", kodi : "101010" , maxsulot : "otvod 90 (40)", soni :1, narxi : "200 000 UZS", jami : "200 000 UZS"},
        {id: 2, sana : "25.07.2022", kodi : "101010" , maxsulot : "otvod 90 (40)", soni :1, narxi : "200 000 UZS", jami : "200 000 UZS"},
       
    ]

    return(
        <section className="w-[63.78rem] bg-white-900">
            <div className="flex justify-between">
                   <ul className="w-[35%]">
                     <li className="check-ul-li">Do'kon:
                        <span className="check-ul-li-span">Alo24</span>
                     </li>
                     <li className="check-ul-li">Telefon:
                        <span className="check-ul-li-span">+998991234567</span>
                     </li>
                     <li className="check-ul-li">Manzil:
                        <span className="check-ul-li-span">Navoiy viloyati</span>
                     </li>
                     <li className="check-ul-li">Sana:
                        <span className="check-ul-li-span">06.08.2022</span>
                     </li>
                   </ul>
                
                <div className="w-[60%] check-ul-li">
                     <h2 className="check-text-style">Sotuv: A10000023</h2> 
                     <h2 className="check-text-style">ALO24</h2> 
                </div>
               
            </div>
            <div>
                <ul className="check-ul-li border-b-[0.8px] border-black-700">
                    <li >Mijoz: <span className="check-ul-li-span"></span> </li>
                    <li >Sotuvchi: <span className="check-ul-li-span">Dilshod Mo'minov</span> </li>  
                </ul>
            </div>
               
            <div className="mt-4">
                <table class="border-collapse border border-slate-400 w-full">
                <thead>
                    <tr>
                        <td className="check-table-rtr">№</td>
                        <td className="check-table-rtr">Sana</td>
                        <td className="check-table-rtr">Kodi</td>
                        <td className="check-table-rtr">Maxsulot</td>
                        <td className="check-table-rtr">Soni</td>
                        <td className="check-table-rtr">Narxi(dona)</td>
                        <td className="check-table-rtr">Jami</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td className="p-1 border text-center text-[0.875rem] font-bold">{item.id}</td>
                                    <td className="check-table-body">{item.sana}</td>
                                    <td className="check-table-body">{item.kodi}</td>
                                    <td className="check-table-body">{item.maxsulot}</td>
                                    <td className="check-table-body">{item.soni}</td>
                                    <td className="check-table-body">{item.narxi}</td>
                                    <td className="check-table-body">{item.jami}</td>
                                </tr>
                            )
                        })
                    }
               
                </tbody>
                </table>
            </div>  

            <div className="border-t-[0.8px] border-black-700 w-full my-[2.5rem]"></div>

            <ul>
                <li className="check-ul-li-foot border-t-0"> Jami: <span>129 000 UZS</span></li>
                <li className="check-ul-li-foot"> Chegirma: <span>0 UZS</span></li>
                <li className="check-ul-li-foot"> To'langan: <span>129 000 UZS</span></li>
                <li className="check-ul-li-foot"> Qarz: <span>0 UZS</span></li>    
            </ul>
    
            <div className="flex justify-around items-center mt-[2rem]">
                <div>
                     <PrintBtn/>
                </div>
               <div className="w-[10rem]">
                   <BtnAddRemove/>
               </div>
                
            </div>
        </section>
    )
}

export default Check;