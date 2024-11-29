const { gql } = require('apollo-server-express');

// GraphQL schema definition using SDL
const typeDefs = gql`
  # Subscription type
  type Subscription {
    id: Int!
    title: String!
    amount: Float!
    description: String
    no_of_days: Int!
    status: String!
  }

  # Member type
  type Member {
    id: Int!
    name: String!
    mobile: String!
    email: String!
    profile_picture: String
    age: Int!
    address: String
    subscription_status: String!
    subscription_id: Int!
    join_date: String!
    start_date: String!
    end_date: String!
    subscription: Subscription!
  }

  # PaymentHistory type
  type PaymentHistory {
    id: Int!
    payment_date: String!
    amount_paid: Float!
    payment_method: String!
    transaction_id: String!
    payment_status: String!
    member_id: Int!
    subscription_id: Int!
    member: Member!
    subscription: Subscription!
  }

  # Input for adding a new Member
  input MemberInput {
    name: String!
    mobile: String!
    email: String!
    profile_picture: String
    age: Int!
    address: String
    subscription_id: Int!
    start_date: String!
    end_date: String!
  }

  # Input for adding payment history
  input PaymentInput {
    payment_date: String!
    amount_paid: Float!
    payment_method: String!
    transaction_id: String!
    payment_status: String!
  }

  # Root query type
  type Query {
    getMembers: [Member]
    getMember(id: Int!): Member
  }

  # Root mutation type
  type Mutation {
    addMember(memberData: MemberInput!, paymentData: PaymentInput): Member
  }
`;

module.exports = { typeDefs };
