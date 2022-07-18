import { ProductTableRow } from './TableRows/ProductTableRow';
import Thead from './Thead';

function Table({ page, data, headers, currentPage, countPage }) {
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
    <table className=' w-full' style={{ borderRadius: '10px' }}>
      <thead className='rounded-t-lg'>{<Thead headers={headers} />}</thead>
      <tbody>{checkRows()}</tbody>
    </table>
  );
}

export default Table;
