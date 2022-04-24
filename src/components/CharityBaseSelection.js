import "../styling/CharityTable.css"
import CharityTable from "./CharityTable"
import { en }  from "../language"
import { GET_CHARITIES_COUNT } from "../queries"
import { useQuery } from "@apollo/react-hooks"
import { useEffect, useState } from "react"
import {
    INCREMENT_VALUE,
    DATA_CAP,
    LoadingContainer,
    getOrdinalNumber
} from "../cbglobals"

function CharityBaseSelection() {

    const [minIncome, setMinIncome] = useState(0);
    const [maxIncome, setMaxIncome] = useState(1000);

    const checkValidMinMaxIncome = (value) => {
        return !isNaN(value) && value >= 0 && value <= 1000000000000;
    }

    const minIncomeChange = (e) => {
        const value = parseFloat(e.target.value);
        if(checkValidMinMaxIncome(value)) {
            setMinIncome(value);
            if(value > maxIncome) {
                setMaxIncome(value);
            }
        }
    }

    const maxIncomeChange = (e) => {
        const value = parseFloat(e.target.value);
        if(checkValidMinMaxIncome(value)) {
            setMaxIncome(parseFloat(value));
            if(value < minIncome) {
                setMinIncome(value);
            }
        }
    }

    return (
        <div>
            <h1>{en.charityBaseReactApp}</h1>
            <br/>
            <p>{en.description}</p>
            <div className="charitySelector">
                <p>{en.minimumIncome}:</p>
                <input type="number" 
                    min={0} 
                    max={1000000000000} 
                    defaultValue={minIncome} 
                    key={minIncome}
                    onBlur={(e) => {minIncomeChange(e)}}
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                />
            </div>
            <br/>
            <div className="charitySelector">
                <p>{en.maximumIncome}:</p>
                <input 
                    type="number" 
                    min={0} 
                    max={1000000000000} 
                    defaultValue={maxIncome}
                    key={maxIncome} 
                    onBlur={(e) => {maxIncomeChange(e)}}
                    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                />
            </div>
            <br/>
            <CharityBaseSelectionTable minIncome={minIncome} maxIncome={maxIncome}/>
        </div>
    );

}

function CharityBaseSelectionTable({minIncome, maxIncome}) {

    const { loading, error, data } = useQuery(GET_CHARITIES_COUNT, {variables: {minIncome: minIncome, maxIncome: maxIncome}});
    const [skip, setSkip] = useState(0);

    useEffect(() => {
        if(data) {
            const count = data.CHC.getCharities.count
            if(count < skip - INCREMENT_VALUE) {
                setSkip(count - INCREMENT_VALUE);
            }
        }
    }, [data, skip])

    if(error) {
        console.error(error);
        return <></>
    }

    if(loading) {
        return <LoadingContainer/>
    }

    if(data) {
        const count = data.CHC.getCharities.count >= DATA_CAP ? DATA_CAP : data.CHC.getCharities.count;
        const onePage = count < INCREMENT_VALUE;
        const firstPage = onePage || skip === 0;
        const lastPage = onePage || count <= (skip + INCREMENT_VALUE);

        const skipChange = (value) => {
            const newValue = skip + value;
            if(newValue <= 0) {
                setSkip(0);
            } else if (newValue >= count) {
                setSkip(count - INCREMENT_VALUE);
            } else {
                setSkip(newValue);
            }
        }

        return (
            <div>
                <div className="charitySelector">
                    <button disabled={firstPage} onClick={() => {skipChange(-INCREMENT_VALUE * 10)}}>{"<<"}</button>
                    <button disabled={firstPage} onClick={() => {skipChange(-INCREMENT_VALUE)}}>{"<"}</button>
                    <p>{en.selection(getOrdinalNumber(skip + 1), getOrdinalNumber(lastPage ? count : (skip + INCREMENT_VALUE)), count)}</p>
                    <button disabled={lastPage} onClick={() => {skipChange(INCREMENT_VALUE)}}>{">"}</button>
                    <button disabled={lastPage} onClick={() => {skipChange(INCREMENT_VALUE * 10)}}>{">>"}</button>
                </div>
                
                <table className="charityTable">
                    <tbody>
                        <tr>
                            <th>{en.charityNameColumn}</th>
                            <th>{en.addressColumn}</th>
                            <th>{en.emailColumn}</th>
                            <th>{en.telephoneColumn}</th>
                            <th>{en.incomeColumn}</th>
                            <th>{en.spendingColumn}</th>
                            <th>{en.grantsColumn}</th>
                            <th>{en.grantsTotalColumn}</th>
                            <th>{en.percentageOfGrantsAsIncomeColumn}</th>
                        </tr>
                        <CharityTable skip={skip} minIncome={minIncome} maxIncome={maxIncome}/>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CharityBaseSelection;