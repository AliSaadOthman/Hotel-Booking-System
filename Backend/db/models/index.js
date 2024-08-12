'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import process from 'process';
import configFile from '../config/config.cjs';

// Get __filename and __dirname equivalents
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Convert __dirname to a file URL
const __dirnameUrl = new URL('file:///' + __dirname + '/');

// Sequelize setup
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Initialize models
const initializeModels = async () => {
    const files = fs.readdirSync(__dirname)
        .filter(file => {
            return (
                file.indexOf('.') !== 0 &&
                file !== basename &&
                file.slice(-3) === '.js' &&
                file.indexOf('.test.js') === -1
            );
        });

    for (const file of files) {
        const modelPath = new URL(file, __dirnameUrl);
        const model = (await import(modelPath)).default(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    }

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
};

await initializeModels();
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
