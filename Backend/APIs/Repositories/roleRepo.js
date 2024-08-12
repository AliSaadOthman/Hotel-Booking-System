import db from '../../db/models/index.js';
class RoleRepo {
    async getRoleByID(roleid) {
        const role = await db.Role.findByPk(roleid);
        return role;
    }

    async getRoleByName(roleName) {
        const role = await db.Role.findOne({ where: { name: roleName } });
        return role.id;
    }

    async createRole(roleData) {
        const role = await db.Role.create(roleData);
        return role.id;
    }

    async editRole(roleid, roleData) {
        const role = await db.Role.update(
            roleData,
            {
                where: {
                    id: roleid,
                },
            },
        );
        return role;
    }
}

export default RoleRepo;