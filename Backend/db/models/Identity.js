export default (sequelize, DataTypes) => {
    const Identity = sequelize.define('Identity', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Default UUID value
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Identity.associate = (models) => {
        Identity.belongsTo(models.User, {
            foreignKey: {
                name: 'userid',
                type: DataTypes.UUID,
                allowNull: false,
            },
            as: 'user'
        });
        Identity.belongsTo(models.Role, {
            foreignKey: {
                name: 'roleid',
                type: DataTypes.UUID,
                allowNull: false,
            },
            as: 'role'
        });
    };

    return Identity;
}