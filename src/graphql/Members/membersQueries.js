import { gql } from "@apollo/client";

export const GET_MEMBERS = gql`
    query {
        members {
            id
            name
            mobile
            address
        }
    }`; 