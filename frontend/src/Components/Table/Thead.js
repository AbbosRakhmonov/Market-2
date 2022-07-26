import { FaSortUp, FaSortDown } from 'react-icons/fa';

function Thead({ headers, Sort, sortItem }) {
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
          <div className='flex items-center ml-1'>
            <span>{header.title}</span>{' '}
            {header.filter && (
              <button className='' onClick={() => Sort(header.filter)}>
                <FaSortUp
                  size={14}
                  color={
                    (sortItem.filter === header.filter &&
                      sortItem.sort === '1' &&
                      'rgba(255, 255, 255, 0.4)') ||
                    '#fff'
                  }
                  style={{
                    transform: 'translateY(50%)',
                  }}
                />
                <FaSortDown
                  size={14}
                  color={
                    (sortItem.filter === header.filter &&
                      sortItem.sort === '-1' &&
                      'rgba(255, 255, 255, 0.4)') ||
                    '#fff'
                  }
                  style={{
                    transform: 'translateY(-50%)',
                  }}
                />
              </button>
            )}
          </div>
        </th>
      ))}
    </tr>
  );
}

export default Thead;
