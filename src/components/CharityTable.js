import "../styling/CharityTable.css"
import { useQuery } from "@apollo/react-hooks"
import { GET_CHARITIES } from "../queries"
import CharityEntry from "./CharityEntry"
import {
    LoadingContainer
} from "../cbglobals"

function CharityTable({ skip, minIncome, maxIncome }) {

    const { loading, error, data } = useQuery(GET_CHARITIES, { variables: { skip: skip, minIncome: minIncome, maxIncome: maxIncome} });

    if(error) {
        console.error(error);
        return <></>
    }

    if(loading) {
        return (
            <tr>
                <td colSpan={"9"}>
                    <LoadingContainer/>
                </td>
            </tr>
        );
    }

    if(data) {
        const list = data.CHC.getCharities.list;

        return list.map(row => {
            return <CharityEntry key={row.id} row={row}/>
        });

    } else {
        return <></>
    }
}

export default CharityTable;