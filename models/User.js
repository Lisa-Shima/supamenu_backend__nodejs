const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 255]  // Password must be at least 6 characters
        }
    }
}, {
    tableName: 'users',  // Specify the table name in lowercase
    timestamps: true
});

module.exports = User;
