import React from "react";
import SearchInput from "../../Components/Inputs/SearchInput"
import Button from "../../Components/Buttons/BtnAddRemove";
import Table from "../../Components/Table/Table";
import FieldContainer from "../../Components/FieldContainer/FieldContainer";
import Pagination from '../../Components/Pagination/Pagination';
function SaleDelivers(){

    const data = [
        {name:"Jasurbek"},
        {name:"Abbos"},
     ]
 
     const headers = [
        {styles:"w-[10%] text-start", filter:"", title:"№"},
        {styles:"w-[80%] text-start", filter:"", title:"Yetkazuvchi"},
        {styles:"w-[10%]", filter:"", title:" "},
     ]



    return(
       <section>
          <form className="sale-deliver-form">
                    <FieldContainer
                        label={'Yetkazuvchining ismi'}
                        placeholder={'misol: Jasurbek'}
                        maxWidth={'w-[43.75rem]'}
                    />
     
                    <div className={'flex gap-[1.25rem] grow items-end'}>
                        <Button
                            add={true}
                            text={`Yangi o'lchov qo'shish`}   
                        />
                        <Button text={'Tozalash'} />
                    </div>
                </form> 
                <div className="inverterizationHead mainPadding">
                    <div className="inverterizationText">Yetkazuvchilar</div>
                    <div><Pagination countPage={6} totalDatas={72} setCurrentPage={``} currentPage={``} /></div>
                </div> 

                <div className="tableContainerPadding">
                   <Table page="packman" currentPage={3} countPage={3} data={data} headers={headers}/>
                </div>
       </section>
    )
}

export default SaleDelivers;