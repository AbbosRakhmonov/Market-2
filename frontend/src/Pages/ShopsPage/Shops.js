import React from "react";
import Filial from "../../Components/Filial/Filial";
import {uniqueId} from "lodash"
function Shops(){
    const data = [
        {director : {firstname : "Jasurbek", lastname : "Toshev", image:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'}, typecount : 4, productcount : 4, totalPrice:1200, shopname : `Pipe house Darxon filiali`, currency : `UZS`, _id:'filial1'},
        {director : {firstname : "Jasurbek", lastname : "Toshev", image:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'}, typecount : 4, productcount : 4, totalPrice:1200, shopname : `Pipe house Darxon filiali 1`, currency : `UZS`, _id:'filial2'},
        {director : {firstname : "Sarverbek", lastname : "Murodullayev", image:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'}, typecount : 5, productcount : 5, totalPrice:1500, shopname : `Pipe house Darxon filiali 2`, currency : `UZS`, _id:'filial3'},
        {director : {firstname : "Abbosbek", lastname : "Toshev", image:'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'}, typecount : 6, productcount : 6, totalPrice:2200, shopname : `Pipe house Darxon filiali 3`, currency : `UZS`, _id:'filial4'},    
   ]


    return(
        <section className="mainPadding">
         {
            data.map((value, index) => {
                return(
                    <div className="pb-[1.25rem]" key={uniqueId('filial')} >
                        <Filial 
                        director={value.director} 
                        typecount={value.typecount}
                        productcount={value.productcount}
                        totalPrice={value.totalPrice}
                        shopname={value.shopname}  
                        currency={value.currency}
                        id={value._id}
                        />
                    </div>
                    
                )
            })
         }
           

        </section>
    )
}

export default Shops