import Thead from "./Thead";

function Table({page, data, headers}) {
    const checkRows = () => {
        switch (page) {
            default:
                return "";
        }
    }
    return (<table>
        <thead>
        {<Thead headers={headers}/>}
        </thead>
        <tbody>
        {checkRows()}
        </tbody>
    </table>);
}

export default Table;