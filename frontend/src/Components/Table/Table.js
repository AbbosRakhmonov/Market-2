import { ProductTableRow } from './TableRows/ProductTableRow';
import Thead from './Thead';

function Table({ page, data, headers, currentPage, countPage, Sort }) {
  const checkRows = () => {
    switch (page) {
      case 'product':
        return (
          <ProductTableRow
            data={data}
            currentPage={currentPage}
            countPage={countPage}
          />
        );
      default:
        return '';
    }
  };
  return (
    <table className='overflow-x-auto w-full'>
      <thead className='rounded-t-lg'>
        {<Thead headers={headers} onClick={Sort} />}
      </thead>
      <tbody>{checkRows()}</tbody>
    </table>
  );
}

export default Table;
