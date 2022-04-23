import { gql } from "apollo-boost"

export const GET_CHARITIES = gql `
query getCharities($skip: Int, $minIncome: Float, $maxIncome: Float) {
    CHC {
        getCharities(filters: { finances: { latestIncome: { gte: $minIncome, lte: $maxIncome } } }) {
            list(limit: 30, skip: $skip, sort: income_asc) {
                id
                names {
                    value
                }
                finances {
                    income
                    spending
                }
                contact {
                    address
                    email
                    phone
                    postcode
                }
                funding {
                    grants {
                        id
                        title
                    funder {
                        id
                        name
                    }
                    amountAwarded
                    currency
                    }
                }
            }
        }
    }
}
`

export const GET_CHARITIES_COUNT = gql `
query getCharities($minIncome: Float, $maxIncome: Float){
    CHC {
        getCharities(filters: { finances: { latestIncome: { gte: $minIncome, lte: $maxIncome } } }) {
            count
        }
    }
}
`