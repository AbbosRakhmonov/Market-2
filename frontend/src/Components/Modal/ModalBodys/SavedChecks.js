import React from "react"
import PrintBtn from "../../Buttons/PrintBtn"
import BtnAddRemove from "../../Buttons/BtnAddRemove"

function SavedChecks() {

    const data = [
        {id: 1, kodi : "101010" , maxsulot : "otvod 90 (40)", soni :1, narxi : "200 000 UZS", jami : "200 000 UZS"},
        {id: 2, kodi : "101010" , maxsulot : "truba 90 (40)", soni :1, narxi : "300 000 UZS", jami : "300 000 UZS"},
        {id: 3, kodi : "101010" , maxsulot : "otvod 90 (40)", soni :1, narxi : "400 000 UZS", jami : "400 000 UZS"},
    ]

    return(
        <section className="w-[63.78rem] bg-white-900">
             <div className="check-saved-head">
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
                
                   <div className="w-[60%]">
                     <h2 className="check-text-style text-end pb-[2rem]">ALO24</h2> 
                     <h2 className="check-text-style text-end">Sotuvchi : <span>Dilshod Muminov</span></h2>
                   </div>
            </div>
            <div className="border-b-[0.8px] border-black-700 mb-1 pb-4">
             <table className="border-collapse border border-slate-400 w-full">
                <thead>
                    <tr>
                        <td className="check-table-rtr">№</td>
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
            <div className="flex justify-between text-[1rem] text-black-700 font-bold">
                <h3>Jami : </h3>
                <h3>7800 USD</h3>
            </div>
            <div className="flex justify-around items-center mt-[3rem]">
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

export default SavedChecks;