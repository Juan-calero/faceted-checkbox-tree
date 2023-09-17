const express = require('express');
const router = express.Router();
const connection = require('../database');

router.get('/', (req, res) => {
	connection.query('SELECT * FROM checkbox_categories', (err, rows, fields) => {
		if (err) throw err;

		let categoryData = {};
		rows.forEach(({ parent, id, name }) => {
			categoryData[parent] = [
				...(categoryData[parent] || []),
				{ categoryId: id, name },
			];
		});

		res.status(200).send(JSON.stringify(categoryData));
	});
});

module.exports = router;
