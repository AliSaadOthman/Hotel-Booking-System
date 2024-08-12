class RoleController {
    constructor({ roleRepo }) {
        this.roleRepo = roleRepo
    }

    async getRoleByID(req, res) {
        const { roleid } = req.body;
        try {
            const role = await this.roleRepo.getRoleByID(roleid);
            res.status(200).json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getRoleByName(req, res) {
        const { roleName } = req.body;
        try {
            const role = await this.roleRepo.getRoleByName(roleName);
            res.status(200).json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createRole(req, res) {
        const { name, description } = req.body;
        try {
            const role = await this.roleRepo.createRole({ name, description });
            res.status(201).json(role.id);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async editRole(req, res) {
        const { roleid, name, description } = req.body;
        try {
            const role = await this.roleRepo.editRole(roleid, { name, description });
            res.status(201).json(role);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default RoleController;