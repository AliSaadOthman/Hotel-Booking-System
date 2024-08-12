class UserController {
    constructor({ userRepo }) {
        this.userRepo = userRepo
    }

    async getAllUsers(req, res){
        try {
            const users = await this.userRepo.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async createUser(req, res) {
        const { first_name, last_name, email, phone_number, address } = req.body;
        try {
            const user = await this.userRepo.createUser({ first_name, last_name, email, phone_number, address });
            res.status(201).json(user.id);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async editUser(req, res) {
        const { userid, first_name, last_name, email, phone_number, address } = req.body;
        try {
            const user = await this.userRepo.editUser(userid, { first_name, last_name, email, phone_number, address });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default UserController;