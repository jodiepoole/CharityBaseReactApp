import "../styling/CharityTable.css"
import {
    getAddress,
    validateValue,
    getCurrency,
    getGrants,
    getGrantsTotal,
    percentageOfGrantsAsIncome
} from "../cbglobals"

function CharityEntry({row}) {

    return(
        <tr>
            <td>{row.names[0].value}</td>
            <td>{getAddress(row.contact)}</td>
            <td>{validateValue(row.contact.email)}</td>
            <td>{validateValue(row.contact.phone)}</td>
            <td>{getCurrency(row.finances[0].income)}</td>
            <td>{getCurrency(row.finances[0].spending)}</td>
            <td>{getGrants(row.funding.grants)}</td>
            <td>{getCurrency(getGrantsTotal(row.funding.grants))}</td>
            <td>{percentageOfGrantsAsIncome(row.finances[0].income, row.funding.grants)}</td>
        </tr>
    )
}

export default CharityEntry;