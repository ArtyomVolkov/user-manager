const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const GraphHTTP = require('express-graphql');
const Schema = require('./src/graphql/schema');
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
// GET
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
// POST
router.post('/api/v1/users/create', (req, res) => {
	pool.connect((err, db, done) => {
		if (err) {
			done();
			return res.status(500).json({success: false, data: err});
		}
		const formData = req.body.data;

		db.query('INSERT INTO users ("firstName", "lastName", "email") VALUES ($1, $2, $3) returning id',
			[formData.firstName, formData.lastName, formData.email]).
		then((result) => {
			done();
			return res.status(200).json(result.rows);
		}).
		catch((error) => {
			done();
			console.log(error.message);
			return res.status(500).json({success: false, data: err});
		});
	});

	pool.on('error', (err) => {
		console.error('idle client error', err.message, err.stack);
		return res.status(500).json({success: false, data: err});
	});
});
// DELETE
router.delete('/api/v1/users/delete/:id', (req, res) => {
	pool.connect((err, db, done) => {
		if (err) {
			done();
			return res.status(500).json({success: false, data: err});
		}

		db.query('DELETE FROM users WHERE id=($1)', [req.params.id]).
		then((result) => {
			done();
			return res.status(200).json(result);
		}).
		catch((error) => {
			done();
			console.log(error.message);
			return res.status(500).json({success: false, data: error});
		});
	});


	pool.on('error', (err) => {
		console.error('idle client error', err.message, err.stack);
		return res.status(500).json({success: false, data: err});
	});
});
// UPDATE
router.put('/api/v1/users/update/:id', (req, res) => {
	pool.connect((err, db, done) => {
		if (err) {
			done();
			return res.status(500).json({success: false, data: err});
		}
		const formData = req.body.data;

		db.query('UPDATE users SET "firstName"=($2), "lastName"=($3), "email"=($4) WHERE id=($1) returning *',
			[formData.id, formData.firstName, formData.lastName, formData.email]).
		then((result) => {
			done();
			return res.status(200).json(result.rows);
		}).
		catch((error) => {
			done();
			console.log(error.message);
			return res.status(500).json({success: false, data: error});
		});
	});

	pool.on('error', (err) => {
		console.error('idle client error', err.message, err.stack);
		return res.status(500).json({success: false, data: err});
	});
});

Server.use(cors());
Server.use(bodyParser.json());
Server.use('/', router);
// GraphQL
Server.use('/api/v1/graphql', GraphHTTP({
	schema: Schema,
	pretty: true,
	graphiql: true
}));
Server.listen(3001, function () {
	console.log('****** Server is listening on 3001 port ******');
});
