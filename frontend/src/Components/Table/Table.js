import { CategoryTableRow } from './TableRows/CategoryTableRow';
import { IncomingTableRow } from './TableRows/IncomingTableRow';
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
      default:
        return '';
    }
  };
  return (
    <table className='overflow-x-auto w-full'>
      <thead className='rounded-t-lg'>
        {<Thead headers={headers} Sort={Sort} />}
      </thead>
      <tbody>{checkRows()}</tbody>
    </table>
  );
}

export default Table;
