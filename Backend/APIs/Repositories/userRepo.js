import db from '../../db/models/index.js';
class UserRepo {
    async getAllUsers() {
        const users = await db.User.findAll();
        return users;
    }

    async createUser(userData) {
        const user = await db.User.create(userData);
        return user;
    }

    async editUser(userid,userData) {
        const user = await dbUser.update(
            userData,
            {
                where: {
                    id: userid,
                },
            },
        );
        return user;
    }
}

export default UserRepo;