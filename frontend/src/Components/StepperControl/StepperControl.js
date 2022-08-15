import React from "react"
import BtnAddRemove from "../Buttons/BtnAddRemove";
import BtnCreateShop from "../Buttons/BtnCreateShop";
const StepperControl = ({handleClickNext, handleClickBack,active}) => {
    return(
        <div>
           {
            active ? 
             <BtnAddRemove 
                text="Yakunlash" 
                add={true} 
                edit={true}
               onClick={handleClickBack}
                
                />
            :
            <BtnCreateShop 
               text="Keyingi qadam" 
               type={"shop"}    
               onClick={handleClickNext}
            />  
}   
                 
        </div>  
    )
}

export default StepperControl;