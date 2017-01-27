const Sequelize = require('sequelize');
const Connection = new Sequelize(
	'tkm', // db
	'tm', // username
	'123456', // password
	{
		dialect: 'postgres',
		host: 'localhost',
		port: 5432,
		idleTimeoutMillis: 15000
	}
);

// DAO
const User = Connection.define('users', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: true
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: true
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	}
}, {timestamps: false}); // (if fields createdAt, updatedAt don't exists)

module.exports = Connection;