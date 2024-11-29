const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const { Member } = require('../models/Member');
const { Op } = require('sequelize'); // Import Sequelize Op for query operators

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

// RootQuery to fetch members or a single member
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    members: {
      type: new GraphQLList(MemberType),
      resolve() {
        try {
          return Member.findAll();
        } catch (error) {
          throw new Error('Error fetching members: ' + error.message);
        }
      },
    },
    member: {
      type: MemberType,
      args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
      async resolve(_, args) {
        try {
          const member = await Member.findByPk(args.id);
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        mobile: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        profile_picture: { type: GraphQLString },
        age: { type: GraphQLInt },
        address: { type: GraphQLString },
        subscription_status: { type: new GraphQLNonNull(GraphQLString) },
        subscription_id: { type: GraphQLString },
        join_date: { type: GraphQLString },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
      },
      async resolve(_, args) {
        try {
          // Check for duplicate email or mobile
          const existingMember = await Member.findOne({
            where: {
              [Op.or]: [{ email: args.email }, { mobile: args.mobile }],
            },
          });

          if (existingMember) {
            throw new Error(
              `A member with email "${args.email}" or mobile "${args.mobile}" already exists.`
            );
          }

          // Validate input fields
          if (args.age && args.age < 0) {
            throw new Error('Age cannot be negative');
          }

          // Create the new member
          return await Member.create(args);
        } catch (error) {
          throw new Error('Error adding member: ' + error.message);
        }
      },
    },
    updateMember: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
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
      async resolve(_, args) {
        try {
          // Validate existence of member
          const member = await Member.findByPk(args.id);
          if (!member) {
            throw new Error('Member not found');
          }

          // Update member details
          await Member.update(args, { where: { id: args.id } });
          return await Member.findByPk(args.id);
        } catch (error) {
          throw new Error('Error updating member: ' + error.message);
        }
      },
    },
    deleteMember: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(_, args) {
        try {
          // Validate existence of member
          const member = await Member.findByPk(args.id);
          if (!member) {
            throw new Error('Member not found');
          }

          // Delete member
          await Member.destroy({ where: { id: args.id } });
          return { message: 'Member deleted successfully' };
        } catch (error) {
          throw new Error('Error deleting member: ' + error.message);
        }
      },
    },
  },
});

// Export the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
