import { CategoryTableRow } from './TableRows/CategoryTableRow';
import { RegisterIncomingTableRow } from './TableRows/RegisterIncomingTableRow';
import { InventoriesTableRow } from './TableRows/InventoriesTableRow';
import { InventoryTableRow } from './TableRows/InventoryTableRow';
import { ProductReportTableRow } from './TableRows/ProductReportTableRow';
import { ProductTableRow } from './TableRows/ProductTableRow';
import { SupplierTableRow } from './TableRows/SupplierTableRow';
import { UnitTableRow } from './TableRows/UnitTableRow';
import Thead from './Thead';
import { IncomingsTableRow } from './TableRows/IncomingsTableRow';
import { RegisterSaleTableRow } from './TableRows/RegisterSaleTableRow';
import { TemporaryIncomingsTableRow } from './TableRows/TemporaryIncomingsTableRow';
import { TemporarySaleTableRow } from './TableRows/TemporarySaleTableRow';
import { SalesListTableRow } from './TableRows/SalesListTableRow';

function Table({
  page,
  data,
  headers,
  currentPage,
  countPage,
  Sort,
  Edit,
  Delete,
  currency,
  changeHandler,
  addProductCheque,
  productCheque,
  Print,
  inputValue,
  inputDisabled,
  Excel,
  editedIncoming,
  saveEditIncoming,
  sortItem,
  AddPayment,
  ReturnPayment,
}) {
  const checkRows = () => {
    switch (page) {
      case 'product':
        return (
          <ProductTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            Edit={Edit}
            Delete={Delete}
          />
        );
      case 'category':
        return (
          <CategoryTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            Edit={Edit}
            Delete={Delete}
          />
        );
      case 'unit':
        return (
          <UnitTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            Edit={Edit}
            Delete={Delete}
          />
        );
      case 'supplier':
        return (
          <SupplierTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            Edit={Edit}
            Delete={Delete}
          />
        );
      case 'productreport':
        return (
          <ProductReportTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            Edit={Edit}
            Delete={Delete}
            currency={currency}
            changeHandler={changeHandler}
            addProductCheque={addProductCheque}
            productCheque={productCheque}
            Print={Print}
            inputValue={inputValue}
          />
        );
      case 'registerincoming':
        return (
          <RegisterIncomingTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            changeHandler={changeHandler}
            Delete={Delete}
            currency={currency}
          />
        );
      case 'inventory':
        return (
          <InventoryTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            changeHandler={changeHandler}
            inputDisabled={inputDisabled}
            Delete={Delete}
          />
        );
      case 'inventories':
        return (
          <InventoriesTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            Excel={Excel}
            Print={Print}
          />
        );
      case 'incomings':
        return (
          <IncomingsTableRow
            Edit={Edit}
            Delete={Delete}
            changeHandler={changeHandler}
            editedIncoming={editedIncoming}
            saveEditIncoming={saveEditIncoming}
            data={data}
            currency={currency}
            currentPage={currentPage}
            countPage={countPage}
          />
        );

      case 'registersale':
        return (
          <RegisterSaleTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            currency={currency}
            Delete={Delete}
            changeHandler={changeHandler}
          />
        );
      case 'temporaryincoming':
        return (
          <TemporaryIncomingsTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            Edit={Edit}
            Delete={Delete}
            Print={Print}
            currency={currency}
          />
        );
      case 'temporarysale':
        return (
          <TemporarySaleTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
            currency={currency}
            Edit={Edit}
            Delete={Delete}
          />
        );
      case 'saleslist':
        return (
          <SalesListTableRow
            data={data}
            currency={currency}
            currentPage={currentPage}
            countPage={countPage}
            Print={Print}
            AddPayment={AddPayment}
            ReturnPayment={ReturnPayment}
          />
        );
      default:
        return '';
    }
  };
  return (
    <table className='overflow-x-auto w-full'>
      <thead className='rounded-t-lg'>
        {<Thead headers={headers} onClick={Sort} sortItem={sortItem} />}
      </thead>
      <tbody>{checkRows()}</tbody>
    </table>
  );
}

export default Table;
