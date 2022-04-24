import "./styling/CharityTable.css"
import { en }  from "./language"

export const INCREMENT_VALUE = 30;
export const DATA_CAP = 10000;

export function LoadingContainer() {
    return (
        <div>
            <h1>{en.loading}...</h1>
        </div>
    )
}

export const getOrdinalNumber = (value) => {
    switch(value % 10) {
        case 1:
            return value + "st";
        case 2: 
            return value + "nd";
        case 3:
            return value + "rd"
        default:
            return value + "th"
    }
}   

export const checkValidWebsite = (website) => {
    if(website) {
        const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        return website.match(regex) !== null;
    } else {
        return false;
    }
}

export const getAddress = (contact) => {
    if(contact.address.length === 0 || !contact.postcode) {
        return "N/A"
    } else {
        return contact.address.join(", ") + ", " + contact.postcode;
    }
};

export const validateValue = (value) => {
    if(Boolean(value)) {
        return value;
    } else {
        return "N/A"
    }
};

export const round = (value) => {
    return +(Math.round(value + "e+2") + "e-2");
};

export const getPercentage = (partialValue, totalValue) => {
    if(partialValue === 0 || totalValue === 0) {
        return 0;
    } else {
        return round((100 * partialValue) / totalValue);
    }
};

export const getCurrency = (value) => {
    return value + " GBP";
};

export const getGrants = (grants) => {
    if(grants.length === 0) {
        return "N/A";
    }

    let grantOutput = "";
    grants.forEach(grant => {
        grantOutput += en.grant(grant.title, grant.amountAwarded, grant.currency, grant.funder.name)
    });
    return grantOutput;
};

export const getGrantsTotal = (grants) => {
    return round(grants.length === 0 ? 0 : grants.map(grant => grant.amountAwarded).reduce((a,b) => a + b));
};

export const percentageOfGrantsAsIncome = (income, grants) => {
    const totalGrantIncome = getGrantsTotal(grants);
    const percentage = getPercentage(totalGrantIncome, income);

    //check for case where income from grants is greater than income in funding
    return (percentage > 100 ? 100 : percentage) + "%";
};