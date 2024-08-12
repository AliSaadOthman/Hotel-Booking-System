'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.createTable('Identities', {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                    allowNull: false,
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                roleid: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'Roles',
                        key: 'id'
                    },
                },
                userid: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'Users',
                        key: 'id'
                    },
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
            });

            console.log('Table created successfully');
        } catch (error) {
            console.error('Error creating table:', error);
            throw error; // Re-throw to be caught by the migration framework
        }
    },
    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.dropTable('Identities');
            console.log('Table dropped successfully');
        } catch (error) {
            console.error('Error dropping table:', error);
            throw error; // Re-throw to be caught by the migration framework
        }
    },
};
