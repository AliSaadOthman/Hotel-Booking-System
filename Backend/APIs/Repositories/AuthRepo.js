import db from '../../db/models/index.js';
class AuthRepo {
    async findByUsername(username) {
        return db.Identity.findOne({ where: { username } });
    }

    async createIdentity(credsData) {
        const creds = await db.Identity.create(credsData);
        return creds;
    }
}

export default AuthRepo;