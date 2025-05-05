const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./Client');

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.ENUM('new', 'delivered', 'rejected'),
    allowNull: false,
    defaultValue: 'new'
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'id'
    }
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;

// const OrderItem = require('./OrderItem');

// Order.hasMany(OrderItem,   { foreignKey: 'orderId', onDelete: 'CASCADE' });