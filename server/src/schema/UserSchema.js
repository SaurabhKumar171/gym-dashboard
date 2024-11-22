const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const { User } = require('../models/User');
const userResolver = require('../resolvers/userResolver');

// UserType to define the structure of the User object
const UserType = new GraphQLObjectType({
  name: 'User',
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

// Root query to fetch users or a single user
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        try {
          return User.findAll();
        } catch (error) {
          throw new Error('Error fetching users: ' + error.message);
        }
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        try {
          const user = User.findByPk(args.id);
          if (!user) {
            throw new Error('User not found');
          }
          return user;
        } catch (error) {
          throw new Error('Error fetching user: ' + error.message);
        }
      },
    },
  },
});

// Mutation to handle add, update, and delete operations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
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
          return User.create({
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
          throw new Error('Error adding user: ' + error.message);
        }
      },
    },
    updateUser: {
      type: UserType,
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
          const [updated] = await User.update(
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
            throw new Error('User not found or no changes made');
          }
          return User.findByPk(args.id); // Return updated user
        } catch (error) {
          throw new Error('Error updating user: ' + error.message);
        }
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        try {
          const deleted = await User.destroy({ where: { id: args.id } });
          if (deleted === 0) {
            throw new Error('User not found');
          }
          return { message: 'User deleted successfully' };
        } catch (error) {
          throw new Error('Error deleting user: ' + error.message);
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
