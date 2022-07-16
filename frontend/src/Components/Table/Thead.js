function Thead({ headers }) {
  return (
    <tr className='grid grid-cols-12'>
      {headers.map((header) => (
        <th className={`col-span-${header.colSpan} bg-primary-900`}>
          {header.title}
        </th>
      ))}
    </tr>
  );
}

export default Thead;
