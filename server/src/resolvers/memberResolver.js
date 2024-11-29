const { Member } = require('../models/Member');

const memberResolver = {
    Query: {
        // Fetch all members
        members: async () => {
            try {
                return await Member.findAll();  // Fetch all members from the database
            } catch (error) {
                throw new Error('Error fetching members: ' + error.message);
            }
        },
        // Fetch a single member by ID
        member: async (parent, { id }) => {
            try {
                const member = await Member.findByPk(id);  // Find member by primary key (ID)
                if (!member) {
                    throw new Error('Member not found');
                }
                return member;
            } catch (error) {
                throw new Error('Error fetching member: ' + error.message);
            }
        },
    },

    Mutation: {
        // Add a new member
        addMember: async (parent, args) => {
            try {
                return await Member.create(args);  // Create a new member in the database
            } catch (error) {
                throw new Error('Error adding member: ' + error.message);
            }
        },
        // Update an existing member
        updateMember: async (parent, args) => {
            try {
                const [updated] = await Member.update(args, {
                    where: { id: args.id },  // Update member with given ID
                });
                if (updated === 0) {
                    throw new Error('Member not found or no changes made');
                }
                return await Member.findByPk(args.id);  // Return the updated member
            } catch (error) {
                throw new Error('Error updating member: ' + error.message);
            }
        },
        // Delete a member by ID
        deleteMember: async (parent, { id }) => {
            try {
                const deleted = await Member.destroy({ where: { id } });  // Delete member by ID
                if (deleted === 0) {
                    throw new Error('Member not found');
                }
                return { message: 'Member deleted successfully' };
            } catch (error) {
                throw new Error('Error deleting member: ' + error.message);
            }
        },
    }
};

module.exports = memberResolver;
