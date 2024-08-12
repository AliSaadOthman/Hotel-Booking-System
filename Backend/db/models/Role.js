import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });

    Role.associate = (models) => {
        Role.hasMany(models.Identity, {
            foreignKey: {
                name: 'roleid',
                type: DataTypes.UUID,
                allowNull: false,
            },
            as: 'role'
        });
    };

    return Role;
}