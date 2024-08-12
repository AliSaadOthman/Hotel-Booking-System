'use strict'
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import container from './container.js';

import userRoutes from './APIs/Routes/userRoutes.js';
import roleRoutes from './APIs/Routes/roleRoutes.js';
import authRoutes from './APIs/Routes/authRoutes.js';

config();
const app = express();
const PORT = process.env.PORT || 3000;
const IP_ADDRESS = '192.168.1.16';

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
const userController = container.resolve('userController');
const roleController = container.resolve('roleController');
const authController = container.resolve('authController');

app.use('/api/users', userRoutes(userController));
app.use('/api/roles', roleRoutes(roleController));
app.use('/api/auth', authRoutes(authController));

// Launch
app.set('port', PORT);
var server = app.listen(PORT, IP_ADDRESS, function () {
    const address = server.address();
    if (address) {
        console.log(`Express server listening on address ${address.address} port ${address.port}`);
    } else {
        console.error('Failed to start server');
    }
});
