const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const categoryRouter = require('./routes/categories');
const chosenCategoryRouter = require('./routes/chosen-categories');
app.use('/categories', categoryRouter);
app.use('/chosen-categories', chosenCategoryRouter);

//If Everything goes correct, Then start Express Server
app.listen(PORT, () => {
	console.log(
		'Database connection is Ready and Server is Listening on Port ',
		PORT
	);
});
