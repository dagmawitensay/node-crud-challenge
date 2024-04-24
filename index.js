const express = require('express');
const bodyParser = require('body-parser');
const personController = require('./WebApi/PersonController');


const app = express();

app.use(bodyParser.json());

app.use(personController);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
