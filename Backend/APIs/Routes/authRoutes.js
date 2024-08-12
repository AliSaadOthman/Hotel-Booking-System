import express from 'express';

const authRoutes = (authController) => {
    const router = express.Router();

    router.post('/login', (req, res) => {
        authController.login(req, res);
    });

    router.post('/register', (req, res) => {
        authController.register(req, res);
    });

    router.post('/logout', (req, res) => {
        authController.logout(req, res);
    });

    return router;
}

export default authRoutes;
