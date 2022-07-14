function Thead({headers}) {
    return (
        <tr>
            {
                headers.map(header => header.filter ? "" :
                    <th className={`col-span-${header.colSpan}`}>{header.title}</th>)
            }
        </tr>
    );
}

export default Thead;