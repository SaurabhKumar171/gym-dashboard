import { gql } from "@apollo/client";

// Mutation to add a member
export const ADD_MEMBER = gql`
  mutation AddMember(
    $name: String!
    $mobile: String!
    $email: String
    $profile_picture: String
    $age: Int
    $address: String
    $subscription_status: String
    $subscription_id: String
    $join_date: String
    $start_date: String
    $end_date: String
  ) {
    addMember(
      name: $name
      mobile: $mobile
      email: $email
      profile_picture: $profile_picture
      age: $age
      address: $address
      subscription_status: $subscription_status
      subscription_id: $subscription_id
      join_date: $join_date
      start_date: $start_date
      end_date: $end_date
    ) {
      id
      name
      mobile
      email
      address
    }
  }
`;

// Mutation to update a member
export const UPDATE_MEMBER = gql`
  mutation UpdateMember(
    $id: Int!
    $name: String
    $mobile: String
    $email: String
    $profile_picture: String
    $age: Int
    $address: String
    $subscription_status: String
    $subscription_id: String
    $join_date: String
    $start_date: String
    $end_date: String
  ) {
    updateMember(
      id: $id
      name: $name
      mobile: $mobile
      email: $email
      profile_picture: $profile_picture
      age: $age
      address: $address
      subscription_status: $subscription_status
      subscription_id: $subscription_id
      join_date: $join_date
      start_date: $start_date
      end_date: $end_date
    ) {
      id
      name
      mobile
      email
      address
    }
  }
`;

// Mutation to delete a member
export const DELETE_MEMBER = gql`
  mutation DeleteMember($id: Int!) {
    deleteMember(id: $id) {
      id
      name
    }
  }
`;
