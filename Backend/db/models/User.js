import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        address: DataTypes.TEXT,
    });

    User.associate = (models) => {
        User.hasOne(models.Identity, {
            foreignKey: {
                name: 'userid',
                type: DataTypes.UUID,
                allowNull: false,
            },
            as: 'user'
        });
    };

    return User
}