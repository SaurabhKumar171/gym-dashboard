const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const { Member } = require('../models/Member');  // Changed from User to Member
const memberResolver = require('../resolvers/memberResolver');  // Changed from userResolver to memberResolver

// MemberType to define the structure of the Member object
const MemberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    mobile: { type: GraphQLString },
    email: { type: GraphQLString },
    profile_picture: { type: GraphQLString },
    age: { type: GraphQLInt },
    address: { type: GraphQLString },
    subscription_status: { type: GraphQLString },
    subscription_id: { type: GraphQLString },
    join_date: { type: GraphQLString },
    start_date: { type: GraphQLString },
    end_date: { type: GraphQLString },
  }),
});

// Root query to fetch members or a single member
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    members: {
      type: new GraphQLList(MemberType),
      resolve(parent, args) {
        try {
          return Member.findAll();  // Changed from User to Member
        } catch (error) {
          throw new Error('Error fetching members: ' + error.message);
        }
      },
    },
    member: {
      type: MemberType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        try {
          const member = Member.findByPk(args.id);  // Changed from User to Member
          if (!member) {
            throw new Error('Member not found');
          }
          return member;
        } catch (error) {
          throw new Error('Error fetching member: ' + error.message);
        }
      },
    },
  },
});

// Mutation to handle add, update, and delete operations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMember: {
      type: MemberType,
      args: {
        name: { type: GraphQLString },
        mobile: { type: GraphQLString },
        email: { type: GraphQLString },
        profile_picture: { type: GraphQLString },
        age: { type: GraphQLInt },
        address: { type: GraphQLString },
        subscription_status: { type: GraphQLString },
        subscription_id: { type: GraphQLString },
        join_date: { type: GraphQLString },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
      },
      resolve(parent, args) {
        try {
          return Member.create({  // Changed from User to Member
            name: args.name,
            mobile: args.mobile,
            email: args.email,
            profile_picture: args.profile_picture,
            age: args.age,
            address: args.address,
            subscription_status: args.subscription_status,
            subscription_id: args.subscription_id,
            join_date: args.join_date,
            start_date: args.start_date,
            end_date: args.end_date,
          });
        } catch (error) {
          throw new Error('Error adding member: ' + error.message);
        }
      },
    },
    updateMember: {
      type: MemberType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        mobile: { type: GraphQLString },
        email: { type: GraphQLString },
        profile_picture: { type: GraphQLString },
        age: { type: GraphQLInt },
        address: { type: GraphQLString },
        subscription_status: { type: GraphQLString },
        subscription_id: { type: GraphQLString },
        join_date: { type: GraphQLString },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          const [updated] = await Member.update(  // Changed from User to Member
            {
              name: args.name,
              mobile: args.mobile,
              email: args.email,
              profile_picture: args.profile_picture,
              age: args.age,
              address: args.address,
              subscription_status: args.subscription_status,
              subscription_id: args.subscription_id,
              join_date: args.join_date,
              start_date: args.start_date,
              end_date: args.end_date,
            },
            { where: { id: args.id } }
          );
          if (updated === 0) {
            throw new Error('Member not found or no changes made');
          }
          return Member.findByPk(args.id);  // Changed from User to Member
        } catch (error) {
          throw new Error('Error updating member: ' + error.message);
        }
      },
    },
    deleteMember: {
      type: MemberType,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        try {
          const deleted = await Member.destroy({ where: { id: args.id } });  // Changed from User to Member
          if (deleted === 0) {
            throw new Error('Member not found');
          }
          return { message: 'Member deleted successfully' };
        } catch (error) {
          throw new Error('Error deleting member: ' + error.message);
        }
      },
    },
  },
});

// Exporting the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
