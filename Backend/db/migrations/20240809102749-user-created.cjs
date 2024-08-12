'use strict';
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.createTable('Users', {
                    id: {
                        type: DataTypes.UUID,
                        defaultValue: DataTypes.UUIDV4,
                        primaryKey: true,
                    },
                    first_name: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    last_name: {
                        type: DataTypes.STRING,
                        allowNull: false,
                    },
                    email: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                    },
                    phone_number: {
                        type: DataTypes.STRING,
                        allowNull: true,
                    },
                    address: {
                        type: DataTypes.TEXT,
                        allowNull: true,
                    },
                    createdAt: {
                        allowNull: false,
                        type: DataTypes.DATE,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                    updatedAt: {
                        allowNull: false,
                        type: DataTypes.DATE,
                        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                    },
                }),
            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.dropTable('Users', { transaction: t }),
            ]);
        });
    },
};
