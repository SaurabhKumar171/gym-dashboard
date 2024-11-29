const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Member } = require('./Member');
const { Subscription } = require('./Subscription');

const PaymentHistory = sequelize.define('PaymentHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount_paid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // To ensure the transaction ID is unique
  },
  payment_status: {
    type: DataTypes.ENUM('Success', 'Failed', 'Pending'),
    allowNull: false,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Member,  // Reference the Member table
      key: 'id',
    },
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subscription,  // Reference the Subscription table
      key: 'id',
    },
  },
}, {
  timestamps: true,  // Include createdAt and updatedAt timestamps
});

// Define the relationships (Associations)
PaymentHistory.belongsTo(Member, {
  foreignKey: 'member_id',
  as: 'member',  // Alias for the relationship
});

PaymentHistory.belongsTo(Subscription, {
  foreignKey: 'subscription_id',
  as: 'subscription',  // Alias for the relationship
});

module.exports = { PaymentHistory };
