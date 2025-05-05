const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Client = sequelize.define('Client', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'clients',  // Make sure the table name is lowercase
    timestamps: true,      // Automatically add createdAt and updatedAt
});

module.exports = Client;
