import React from "react"
import DatePicker from "react-datepicker";
import { IoCalendarNumberOutline } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";

function Dates({ value, label, onChange }){

    return(
        <div className="flex items-center">
            <div className="text-[0.875rem] text-blue-700 w-[8rem]">{label} <span>:</span></div>
            <div className="relative">
               <DatePicker selected={value} onChange={onChange} className="datePickerStyle" />
               <IoCalendarNumberOutline className="datePickerIcon"/>
            </div>
        </div>
    )
}

export default Dates;