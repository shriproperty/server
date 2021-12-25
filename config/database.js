import { Sequelize } from 'sequelize';
import config from '../config.js';

const sequelize = new Sequelize(config.db, config.dbUser, config.dbPassword, {
	dialect: 'mysql',
	host: 'localhost',
});

export default sequelize;
