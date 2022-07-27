import { CategoryTableRow } from './TableRows/CategoryTableRow';
import { IncomingTableRow } from './TableRows/IncomingTableRow';
import { InventoriesTableRow } from './TableRows/InventoriesTableRow';
import { InventoryTableRow } from './TableRows/InventoryTableRow';
import { ProductReportTableRow } from './TableRows/ProductReportTableRow';
import { ProductTableRow } from './TableRows/ProductTableRow';
import { SupplierTableRow } from './TableRows/SupplierTableRow';
import { UnitTableRow } from './TableRows/UnitTableRow';
import Thead from './Thead';

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
  sortItem,
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
      case 'incoming':
        return (
          <IncomingTableRow
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
