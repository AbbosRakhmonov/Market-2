import React from "react";
import Input from "../../Components/Inputs/Input";
import SearchInput from "../../Components/Inputs/SearchInput";
import BtnAddRemove from "../../Components/Buttons/BtnAddRemove";
import Pagination from "../../Components/Pagination/Pagination";
import SelectForm from "../../Components/Select/SelectForm";
import Table from "../../Components/Table/Table";
const CategoryPage = () => {
  const headers = [
    {
      title: "№",
      filter: "",
      styles: "w-[10%]",
    },
    {
      title: "Kategoriya kodi",
      filter: true,
      styles: "w-[16%]",
    },
    {
      title: "Kategoriya nomi",
      filter: "",
      styles: "w-[64%]",
    },
    {
      title: "",
    },
  ];
  const data = [
    {
      _id: "1",
      code: "001",
      name: "merry",
    },
    {
      _id: "2",
      code: "002",
      name: "jack",
    },
  ];
  return (
    <div className="w-screen h-screen bg-[#F5F5F5] text-blue-700 py-5 pr-5 pl-10">
      <div className="w-full flex items-center justify-between relative pl-1">
        <div className="w-[64%] flex justify-between items-center">
          <div className="w-[7.5rem]">
            <Input label={"Kategoriya kodi"} placeholder={"misol: 000000"} />
          </div>
          <div className="border-l-2 border-blue-100 h-[4.2rem]"></div>
          <div className="w-[calc(100%_-_9.6rem)]">
            <Input
              label={"Kategoriya nomi"}
              placeholder={"misol: Sabzavotlar"}
            />
          </div>
        </div>
        <div className=" w-[39%] mt-7 ml-4">
          <div className="flex">
            <div className="w-[57%]">
              <BtnAddRemove add={true} text={"Yangi kategoriya qo'shish"} />
            </div>
            <span className="w-[43%] ml-4 mr-[.85rem]">
              <BtnAddRemove text={"Tozalash"} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center pl-1">
        <p className="my-12 leading-[1.8rem] text-xl text-blue-900">
          Kategoriyalar
        </p>
        {data && <Pagination />}
      </div>
      <div className="w-full flex items-center pl-1">
        <div className="w-[25.3rem] mr-3 flex">
          <SelectForm />
          <div className="ml-6 paragraf flex items-center justify-around">
            <label htmlFor="tableid">Kategoriya kodi:</label>
            <div className="w-[6.8rem] ml-3">
              <Input
                placeholder={"misol: 000000"}
                type="text"
                forid={"tableid"}
              />
            </div>
          </div>
        </div>
        <div className="w-[calc(100%_-_25.3rem)] box-border mr-[.85rem]">
          <SearchInput placeholder={"qidirish..."} />
        </div>
      </div>
      <div className="pr-3 pt-6">
        <Table
          headers={headers}
          page="category"
          data={data}
          currentPage={0}
          countPage={0}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
