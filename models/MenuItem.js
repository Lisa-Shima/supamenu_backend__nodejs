const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Client = require('./Client');  // Import the Client model to set up the relationship

const MenuItem = sequelize.define('MenuItem', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    clientId: {  // Define the clientId field
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Client,  // This links the MenuItem to the Client model
            key: 'id'
        }
    },
}, {
    tableName: 'menu_items',  // Ensure it's lowercase for consistency with PostgreSQL
    timestamps: true,         // Automatically add createdAt and updatedAt
});

// Adding a relationship: A menu item belongs to a client
MenuItem.associate = (models) => {
    MenuItem.belongsTo(models.Client, { foreignKey: 'clientId' });
};

module.exports = MenuItem;
