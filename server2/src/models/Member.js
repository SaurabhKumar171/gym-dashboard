const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { Subscription } = require("./Subscriptions")

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subscription_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subscription,
      key: 'id',
    }
  },
  join_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
});


Member.belongsTo(Subscription, {
  foreignKey: 'subscription_id',
  as: 'subscription',
});

module.exports = { Member };
