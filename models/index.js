const sequelize = require('../config/database');
const User      = require('./User');
const Client    = require('./Client');
const MenuItem  = require('./MenuItem');
const Order     = require('./Order');
const OrderItem = require('./OrderItem');

// 1) Client → MenuItem
Client.hasMany(MenuItem,  { foreignKey: 'clientId', onDelete: 'CASCADE' });
MenuItem.belongsTo(Client, { foreignKey: 'clientId' });

// 2) Client → Order
Client.hasMany(Order,     { foreignKey: 'clientId', onDelete: 'CASCADE' });
Order.belongsTo(Client,    { foreignKey: 'clientId' });

// 3) Order → OrderItem
Order.hasMany(OrderItem,   { foreignKey: 'orderId',  onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// 4) MenuItem → OrderItem
MenuItem.hasMany(OrderItem,   { foreignKey: 'menuItemId', onDelete: 'CASCADE' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' });

module.exports = { sequelize, User, Client, MenuItem, Order, OrderItem };
