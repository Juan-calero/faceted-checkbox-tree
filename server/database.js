const categoriesJson = require('./response.json');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection to the database
const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

// open the MySQL connection
connection.connect(async (error) => {
	if (error) {
		console.log('A error has been occurred while connecting to database.');
		throw error;
	}

	await connection.query(
		`CREATE TABLE IF NOT EXISTS checkbox_categories (
			id VARCHAR(255) NOT NULL PRIMARY KEY,
			parent VARCHAR(255) NOT NULL,
			name VARCHAR(255) NOT NULL,
			selected BOOLEAN
			)`,
		(err, rows, fields) => {
			if (err) throw err;

			console.log('Table created');

			categoriesJson.data.categories.forEach(({ id, parent, name }) => {
				connection.query(`INSERT IGNORE INTO checkbox_categories (id, parent, name, selected)
				VALUES ('${id}', '${parent}', "${name}", FALSE)`);
			});
		}
	);
});

module.exports = connection;
