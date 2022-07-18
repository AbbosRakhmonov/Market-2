import { TiArrowUnsorted } from 'react-icons/ti';

function Thead({ headers, onClick }) {
  return (
    <tr className='grid grid-cols-12 bg-primary-900 rounded-t-lg'>
      {headers.map((header, index) => (
        <th
          key={index}
          className={`col-span-${
            header.colSpan
          } font-bold text-sm text-white-900 py-4 flex items-center justify-center ${
            index === headers.length - 1 ? '' : 'border-r-2 border-primary-700'
          }`}
        >
          {header.title}{' '}
          {header.filter ? (
            <button name={header.filter} onClick={onClick}>
              <TiArrowUnsorted />
            </button>
          ) : (
            ''
          )}
        </th>
      ))}
    </tr>
  );
}

export default Thead;
