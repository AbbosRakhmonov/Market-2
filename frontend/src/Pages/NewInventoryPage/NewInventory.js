import React from "react";
import Table from "../../Components/Table/Table";
import Pagination from '../../Components/Pagination/Pagination';
import SelectForm from '../../Components/Select/SelectForm'
import Input from "../../Components/Inputs/Input";
import SearchInput from "../../Components/Inputs/SearchInput";
import { ConfirmBtn } from "../../Components/Buttons/SaveConfirmBtn";
function Inverterization(){


    const data = [
        {_id: 1, productdata: {code : 10001, name: "Milnitsa"}, total: 9999, inputDisabled:"disabled", difference: -100, unit: {name :"metr"}},
        {_id: 2, productdata: {code : 10002, name: "Milnitsa2"}, total: 7777, inputDisabled:"disabled", difference: -200, unit: {name :"metr"}},
        {_id: 3, productdata: {code : 10003, name: "Milnitsa3"}, total: 8888, inputDisabled:"disabled", difference: 100, unit: {name :"metr"}},
    ]

    const headers = [
       {styles:"w-[10%]", filter:"", title:"№"},
       {styles:"w-[10%]", filter:"code", title:"Kodi"},
       {styles:"w-[20%]", filter:"", title:"Nomi"},
       {styles:"w-[10%] text-center", filter:"", title:"Dastlabki"},
       {styles:"w-[10%] text-center", filter:"", title:"Sanoq"},
       {styles:"w-[10%] text-center", filter:"", title:"Farq"},
       {styles:"", filter:"", title:"Izoh"},
       {styles:"", filter:"", title:" "},
    ]

    return(
        <div className="p-[1.5rem]">

            <div className="inverterizationHead">
                <div className="inverterizationText">Invertarizatsiya</div>
                <div><Pagination countPage={6} totalDatas={72} setCurrentPage={``} currentPage={``} /></div>
            </div>

            <div className="inverterizationBody">
                <div className=""><SelectForm/> </div>
                <div className="w-[20%] flex items-center">
                    <span className="inverterizationCodeText">Kodi : </span>
                    <Input placeholder={`Placeholder`} type="text" />
                </div>
                <div className="w-[50%]"><SearchInput placeholder={`Qidirish`}/> </div>
                <div className=""><ConfirmBtn text={`Yakunlash`}/> </div>
            </div>
           
            <div>
                <Table page="inventory" currentPage={3} countPage={3} data={data} headers={headers}/>
            </div>
        </div>
    )
}

export default Inverterization;