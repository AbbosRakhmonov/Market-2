import React from "react";
import { IoPrint } from "react-icons/io5";
function PrintBtn({onClick}){
    return(
        <section>
            <button className="print-btn-style" onClick={onClick}>
                <span className="print-text-style">Chop etish</span>
                <span className="print-icon-style"><IoPrint className="w-[0.9rem] text-primary-800 h-[0.9rem]"/></span>
            </button>
        </section>
    )
}

export default PrintBtn;