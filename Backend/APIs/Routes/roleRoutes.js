import express from 'express';
import { authenticateUser, authorizeUser } from '../../Middleware/AuthMiddleware.js';

const roleRoutes = (roleController) => {
    const router = express.Router();

    router.get('/getRoleByID', (req, res) => {
        roleController.getRoleByID(req, res);
    });

    router.get('/getRoleByName', (req, res) => {
        roleController.getRoleByName(req, res);
    });

    router.post('/createRole', (req, res) => {
        roleController.createRole(req, res);
    });

    router.put('/editRole', (req, res) => {
        roleController.editRole(req, res);
    });

    return router;
}

export default roleRoutes;
