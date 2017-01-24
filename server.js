const express = require('express');
const cors = require('cors');
const router = express.Router();
const PG = require('pg');
const DB_CONFIG = {
	user: 'tm', // user-role-name
	database: 'tkm', // db name
	password: '123456',
	host: 'localhost',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 20000
};

const pool = new PG.Pool(DB_CONFIG);
const Server = express();

/*
 * Routes
 *
 */
/**
 * @description Get list of users
 */
router.get('/api/v1/users', (req, res) => {
	pool.connect((err, db, done) => {
		if (err) {
			done();
			return res.status(500).json({success: false, data: err});
		}

		db.query('SELECT * from users').
		then((result)=> {
			done();
			return res.status(200).json(result.rows);
		}).
		catch((err) => {
			done();
			return res.status(500).json({success: false, data: err});
		});
	});

	pool.on('error', (err) => {
		console.error('idle client error', err.message, err.stack);
		return res.status(500).json({success: false, data: err});
	});
});

Server.use(cors());
Server.use('/', router);
Server.listen(3001, function () {
	console.log('****** Server is listening on 3001 port ******');
});
