const User = require('../models/User');

const userResolver = {
    Query: {
        // Fetch all users
        users: async () => {
            try {
                return await User.findAll();  // Fetch all users from the database
            } catch (error) {
                throw new Error('Error fetching users: ' + error.message);
            }
        },
        // Fetch a single user by ID
        user: async (parent, { id }) => {
            try {
                const user = await User.findByPk(id);  // Find user by primary key (ID)
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            } catch (error) {
                throw new Error('Error fetching user: ' + error.message);
            }
        },
    },

    Mutation: {
        // Add a new user
        addUser: async (parent, args) => {
            try {
                return await User.create(args);  // Create a new user in the database
            } catch (error) {
                throw new Error('Error adding user: ' + error.message);
            }
        },
        // Update an existing user
        updateUser: async (parent, args) => {
            try {
                const [updated] = await User.update(args, {
                    where: { id: args.id },  // Update user with given ID
                });
                if (updated === 0) {
                    throw new Error('User not found or no changes made');
                }
                return await User.findByPk(args.id);  // Return the updated user
            } catch (error) {
                throw new Error('Error updating user: ' + error.message);
            }
        },
        // Delete a user by ID
        deleteUser: async (parent, { id }) => {
            try {
                const deleted = await User.destroy({ where: { id } });  // Delete user by ID
                if (deleted === 0) {
                    throw new Error('User not found');
                }
                return { message: 'User deleted successfully' };
            } catch (error) {
                throw new Error('Error deleting user: ' + error.message);
            }
        },
    }
};

module.exports = userResolver;
