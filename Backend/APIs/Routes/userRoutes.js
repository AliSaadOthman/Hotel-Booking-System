import express from 'express';
import { authenticateUser, authorizeUser } from '../../Middleware/AuthMiddleware.js';

const userRoutes = (userController) => {
    const router = express.Router();

    router.get('/getAllUsers', authenticateUser, authorizeUser('admin'), (req, res) => {
        userController.getAllUsers(req, res);
    });

    router.post('/createUser', (req, res) => {
        userController.createUser(req, res);
    });

    router.put('/editUser', authenticateUser, authorizeUser('admin'), (req, res) => {
        userController.cditUser(req, res);
    });

    return router;
}

export default userRoutes;
