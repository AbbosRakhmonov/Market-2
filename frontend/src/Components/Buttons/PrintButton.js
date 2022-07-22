import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { IoPrint } from "react-icons/io5";

export const PrintButton = (component) => {
  const componentRef = useRef();
  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button className="flex text-primary-800 leading-[1.875rem]">
            <span className="bg-primary-800 p-2 text-white-900 text-sm rounded-l-lg">
              Chop etish
            </span>
            <span className="displayFlex bg-white-900 p-[.7rem] rounded-r-lg">
              <IoPrint className="text-2xl" />
            </span>
          </button>
        )}
        content={() => componentRef.current}
      />
      <component.component ref={componentRef} />
    </div>
  );
};
