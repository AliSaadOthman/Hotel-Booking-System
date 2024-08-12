import { createContainer, asClass } from 'awilix';
import UserRepo from './APIs/Repositories/userRepo.js';
import UserController from './APIs/Controllers/userController.js';

import RoleRepo from './APIs/Repositories/roleRepo.js';
import RoleController from './APIs/Controllers/roleController.js';

import AuthRepo from './APIs/Repositories/authRepo.js';
import AuthController from './APIs/Controllers/authController.js';

const container = createContainer();

container.register({
    userRepo: asClass(UserRepo).scoped(),
    userController: asClass(UserController).scoped(),

    roleRepo: asClass(RoleRepo).scoped(),
    roleController: asClass(RoleController).scoped(),

    authRepo: asClass(AuthRepo).scoped(),
    authController: asClass(AuthController).scoped(),
});

export default container;