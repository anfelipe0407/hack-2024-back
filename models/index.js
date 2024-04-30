'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const configPath = path.join(__dirname, '..', 'config', 'config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'))[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: false // Desactiva los registros de Sequelize
  });
}

const files = await readdir(__dirname);

for (const file of files) {
  if (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js') {
    const modelPath = path.join(__dirname, file);
    const model = (await import(`file://${modelPath}`)).default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

