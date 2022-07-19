import { TiArrowUnsorted } from 'react-icons/ti';

function Thead({ headers, onClick }) {
  return (
    <tr className='bg-primary-900 rounded-t-lg'>
      {headers.map((header, index) => (
        <th
          key={index}
          scope='col'
          className={`th 
        ${
          index === headers.length - 1
            ? 'rounded-tr-lg'
            : 'border-r-2 border-primary-700'
        }
        ${index === 0 && 'rounded-tl-lg'}
        ${header.styles}
        `}
        >
          <div className='inline-flex items-center'>
            <span>{header.title}</span>{' '}
            {header.filter ? (
              <button name={header.filter} onClick={onClick}>
                <TiArrowUnsorted />
              </button>
            ) : (
              ''
            )}
          </div>
        </th>
      ))}
    </tr>
  );
}

export default Thead;
