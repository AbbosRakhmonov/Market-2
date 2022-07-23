import React from "react";
import Input from "../../Components/Inputs/Input";
import SearchInput from "../../Components/Inputs/SearchInput";
import BtnAddRemove from "../../Components/Buttons/BtnAddRemove";
import Pagination from "../../Components/Pagination/Pagination";
import SelectForm from "../../Components/Select/SelectForm";
import Table from "../../Components/Table/Table";
import FieldContainer from "../../Components/FieldContainer/FieldContainer";
import FilterButtons from "../../Components/FilterButtons/FilterButtons";
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
    <section className="w-screen h-screen bg-[#F5F5F5] text-blue-700 py-5 pr-5 pl-10">
      <form>
        <div className="w-full flex items-center justify-between relative pl-1">
          <div className="w-[64%] flex gap-[1.25rem] items-center">
            <FieldContainer
              label={"Kategoriya kodi"}
              placeholder={"misol: 000000"}
              maxWidth={true}
              type={"number"}
            />
            <FieldContainer
              label={"Kategoriya nomi"}
              placeholder={"misol: Sabzavotlar"}
            />
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
          {data && (
            <Pagination countPage={10} currentPage={0} totalDatas={100} />
          )}
        </div>
        <div className="w-full flex items-center pl-1">
          <div className=" mr-4 flex">
            <SelectForm />
            <div className="ml-6 paragraf flex items-center justify-around">
              <FilterButtons
                label={"Kategoriya kodi"}
                element={<Input placeholder={"misol: 000000"} type="text" />}
              />
            </div>
          </div>
          <div className="w-[calc(100%_-_29.3rem)] box-border mr-[.8rem]">
            <SearchInput placeholder={"qidirish..."} />
          </div>
        </div>
        <div className="pr-3 pt-6">
          <Table
            headers={headers}
            page="category"
            data={data}
            currentPage={0}
            countPage={10}
          />
        </div>
      </form>
    </section>
  );
};

export default CategoryPage;
