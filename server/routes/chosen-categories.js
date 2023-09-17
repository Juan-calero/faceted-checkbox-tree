const express = require('express');
const router = express.Router();
const connection = require('../database');

router.get('/', (req, res) => {
	connection.query('SELECT * FROM checkbox_categories', (err, rows, fields) => {
		if (err) throw err;

		let chosenCategories = {};
		rows.forEach(({ selected, id, name }) => {
			chosenCategories[id] = { name, selected: selected === 1 };
		});

		res.status(200).send(JSON.stringify(chosenCategories));
	});
});

router.put('/', (req, res) => {
	Object.entries(req.body).forEach(([id, { selected }]) => {
		connection.query(
			`UPDATE checkbox_categories
			SET selected = ?
			WHERE id= ?`,
			[selected, id],
			(err) => {
				if (err) throw err;
			}
		);
	});

	res.status(200).send({ status: 'ok' });
});

module.exports = router;
